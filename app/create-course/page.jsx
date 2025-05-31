'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ChartBarStacked, CircleEllipsis, Lightbulb } from 'lucide-react';
import React, { act, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CategorySelection from './_components/category-selection';
import TopicDescription from './_components/topic-description';
import OptionSelection from './_components/option-selection';
import { UserInputContext } from '../_contexts/UserInputContext';
import Link from 'next/link';
import { generateCoursePlanAI } from '@/config/geminiConfig';
import LoadingDialog from './_components/loading-dialog';
import { db } from '@/config/db';
import { CourseList } from '@/config/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const CreateCourse = () => {
    const stepperOptions = [
        {
            id: 1,
            name: 'Category',
            icon: <ChartBarStacked size={24} />,
        },
        {
            id: 2,
            name: 'Topic',
            icon: <Lightbulb size={24} />,
        },
        {
            id: 3,
            name: 'Options',
            icon: <CircleEllipsis size={24} />,
        },
    ];

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        console.log(userCourseInput);
    }, [userCourseInput]);

    const router = useRouter();

    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        if (activeIndex < stepperOptions.length - 1) {
            setActiveIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
        }
    };

    const checkStatus = () => {
        if (!userCourseInput) return true;

        if (activeIndex === 0) {
            return !userCourseInput.category || userCourseInput.category.length === 0;
        }

        if (activeIndex === 1) {
            return !userCourseInput.topic || userCourseInput.topic.length === 0;
        }

        if (activeIndex === 2) {
            return (
                userCourseInput.difficulty === undefined ||
                userCourseInput.duration === undefined ||
                userCourseInput.displayVideo === undefined ||
                userCourseInput.chapters === undefined
            );
        }

        return false;
    };


    // NOTE:CREATNG COURSE GEMINI CALLING
    const generateCourseLayout = async () => {
        setLoading(true);
        const BASIC_PROMPT = `Generate a course tutorial in JSON format based on the following details:
                            Field,
                            Course Name(You may generate a suitable title),
                            Description,
                            Category,
                            Topic,
                            Level, 
                            Total Duration,
                            Number of Chapters, 

                            Each chapter should include:
                            chapter_name: The title of the chapter
                            about: A short description of the content covered in the chapter
                            duration: Estimated time to complete (in minutes)

                            Please format the output as clean and readable JSON.`;

        const USER_INPUT_PROMPT = `field: ${userCourseInput?.category}
                                   courseName: (You may generate a suitable title)
                                    description:(Provide a brief overview of the course according to the difficulty which is ${userCourseInput?.difficulty})
                                    category: ${userCourseInput?.category}
                                    topic: ${userCourseInput?.topic}
                                    difficulty: ${userCourseInput?.difficulty}
                                    totalDuration: ${userCourseInput?.duration}
                                    numberOfChapter: ${userCourseInput?.chapters}`;

        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
        console.log(FINAL_PROMPT);
        const result = await generateCoursePlanAI(FINAL_PROMPT);
        console.log(result);
        console.log(JSON.parse(result));
        setLoading(false);
        toast.success("Course Layout Generated!");
        saveCourseLayoutToDatabase(JSON.parse(result));
    };

    // NOTE:SAVE TO DATABASE
    const saveCourseLayoutToDatabase = async (courselAYOUT) => {
        var id = uuidv4(); //this is the course Id
        setLoading(true);
        const result = await db.insert(CourseList).values({
            courseId: id,
            name: userCourseInput?.topic,
            category: userCourseInput?.category,
            difficulty: userCourseInput?.difficulty,
            courseOutput: courselAYOUT,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userProfileImage: user?.imageUrl
        });
        console.log("Finish");
        setLoading(false);
        router.replace(`/create-course/${id}`);
    };


    return (
        <section className="px-6 py-12 max-w-5xl mx-auto">
            <div className="mb-12 relative">


                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-white tracking-tight">
                        Create Course
                    </h2>
                    <p className="text-gray-400 text-md mt-2">
                        Follow these steps to build your course quickly and beautifully.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between w-full relative overflow-x-auto pb-4">
                {stepperOptions.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center relative z-10">
                            <div
                                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg border-4 transition-all duration-300
                                    ${index < activeIndex
                                        ? 'border-green-400 bg-green-600 text-white'
                                        : index === activeIndex
                                            ? 'border-pink-400 animate-pulse bg-gradient-to-br from-purple-700 via-pink-700 to-purple-900 text-white'
                                            : 'border-gray-600 bg-gray-800 text-white'
                                    }`}
                            >
                                {step.icon}
                            </div>
                            <p className="text-lg mt-3 text-white font-medium">{step.name}</p>
                        </div>

                        {index < stepperOptions.length - 1 && (
                            <div
                                className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500
                                    ${index < activeIndex
                                        ? 'bg-green-400'
                                        : index === activeIndex - 1
                                            ? 'bg-gradient-to-r from-purple-700 via-pink-700 to-purple-900'
                                            : 'bg-gray-700'
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {activeIndex === 0 ? <CategorySelection /> : activeIndex === 1 ? <TopicDescription /> : activeIndex === 2 ? <OptionSelection /> : null}

            <div className="flex justify-between mt-12">
                <Button
                    onClick={handlePrevious}
                    disabled={activeIndex === 0}
                    className="bg-gray-700 cursor-pointer hover:bg-gray-600 text-white text-base font-medium px-6 py-2 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                    Previous
                </Button>

                {activeIndex < stepperOptions.length - 1 ? (
                    <Button
                        disabled={checkStatus()}
                        onClick={handleNext}
                        className="bg-purple-700 hover:bg-purple-800 text-white text-base font-medium px-6 py-2 rounded-lg transition-all cursor-pointer duration-300"
                    >
                        Next Step
                    </Button>
                ) : (
                    <Button
                        disabled={checkStatus()}
                        onClick={() => generateCourseLayout()}
                        className="bg-green-600 hover:bg-green-700 cursor-pointer text-white text-base font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md animate-pulse"
                    >
                        ✨ Generate Course Layout
                    </Button>
                )}
            </div>
            <LoadingDialog loading={loading} />
        </section>
    );
};

export default CreateCourse;
