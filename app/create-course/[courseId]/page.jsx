"use client";

import { db } from '@/config/db';
import { Chapters, CourseList } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { use } from 'react';
import CourseBasicInfo from './_components/course-basic-info';
import CourseDetail from './_components/course-detail';
import { Button } from '@/components/ui/button';
import { generateCourseContentAI } from '@/config/geminiConfig';
import toast from 'react-hot-toast';
import LoadingDialog from '../_components/loading-dialog';
import getVideos from '@/config/service';
import { useRouter } from 'next/navigation';

const CourseLayout = ({ params }) => {
  const actualParams = use(params);
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    actualParams && user && getCourseDetails();
  }, [actualParams, user]);

  const getCourseDetails = async () => {
    const result = await db.select().from(CourseList)
      .where(and(
        eq(CourseList.courseId, actualParams?.courseId),
        eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
      ));
    setCourse(result[0]);
    console.log(result);
  };

  const GenerateChhapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.chapters;
    if (!chapters || chapters.length === 0) return;

    try {
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];

        const prompt = `
You are an expert educator and content creator. Write professional, educational content for a course titled: "${course?.courseOutput?.courseName}". 

Generate rich content for Chapter ${index + 1}: "${chapter.chapter_name}".

Return the content in the **following strict JSON structure**, using double quotes for all keys and string values:

{
  "title": "A clear, engaging, and specific title for this chapter.",
  "description": [
    "Break down the topic into multiple key points, explained clearly and thoroughly.",
    "Each point should be a complete explanation of an important subtopic, concept, or technique.",
    "Use language that is accessible to learners at a ${course?.courseOutput?.level} level.",
    "Include examples, practical insights, or step-by-step explanations wherever possible.",
    "If needed, add brief inline code snippets wrapped in triple backticks like \`\`\`python\n# code here\n\`\`\`."
  ],
  "codeExample": "Provide a full, real-world applicable code example that reinforces the concepts covered above. Format it using triple backticks (e.g., \`\`\`python\ncode\n\`\`\`). Keep the code clean, professional, and well-commented."
}

Guidelines:
- Do NOT return any text outside the JSON structure.
- Ensure the JSON is properly formatted and valid.
- The "description" field should be a **multi-paragraph or bullet-pointed array**, not a single paragraph.
- Make sure the content is informative, accurate, and instructional.

Start now.
`.trim();


        const videoResp = await getVideos(`${course?.courseOutput?.courseName}: ${chapter.chapter_name}`);
        const videoId = videoResp[0]?.id?.videoId || "";

        const result = await generateCourseContentAI(prompt);
        const content = JSON.parse(result);

        // Insert into database
        await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId
        });
      }

      toast.success("All chapters generated successfully!");
      router.replace(`/create-course/${course?.courseId}/finish`);
    } catch (error) {
      console.error(error);
      toast.error("Error generating course content");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='mt-2 px-7 md:px-20 lg:px-44'>
      <LoadingDialog loading={loading} />
      <CourseBasicInfo course={course} />
      <CourseDetail course={course} />
      <Button className="my-10 w-full text-xl cursor-pointer" onClick={GenerateChhapterContent}>Generate Course Content</Button>
    </div>
  );
};

export default CourseLayout;
