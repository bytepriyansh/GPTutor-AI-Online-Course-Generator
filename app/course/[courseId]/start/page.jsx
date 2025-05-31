"use client";

import { db } from '@/config/db';
import { Chapters, CourseList } from '@/config/schema';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { use } from 'react';
import ChapterListCard from './_components/chapter-list-card';
import ChapterContent from './_components/chapter-content';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CourseStart = ({ params }) => {
    const resolvedParams = use(params);
    const [course, setCourse] = useState();
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
    const [chapterContent, setChapterContent] = useState(null);

    useEffect(() => {
        if (resolvedParams?.courseId) {
            getCourse();
        }
    }, [resolvedParams]);

    const getCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList.courseId, resolvedParams.courseId));
        setCourse(result[0]);
        getSelectedChapterContent(0, result[0]?.courseId);
    };

    const getSelectedChapterContent = async (chapterId, courseId = course?.courseId) => {
        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId), eq(Chapters.courseId, courseId)));
        setChapterContent(result[0]);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="hidden md:flex flex-col w-80 bg-zinc-950 border-r border-zinc-800 shadow-inner shadow-zinc-900">
                <div className="p-4 border-b border-zinc-800 flex items-center justify-start gap-2">
                    <Link href="/dashboard" className="w-full">
                        <Button variant="outline" className="w-full flex items-center gap-2 text-sm font-medium text-white bg-pink-900 cursor-pointer hover:bg-zinc-800">
                            <ArrowLeft size={16} />
                            Back to Home
                        </Button>
                    </Link>
                </div>
                <div className="p-5 border-b border-zinc-800 bg-gradient-to-r from-emerald-500 to-green-400 text-black font-extrabold text-xl tracking-wide shadow-md">
                    {course?.courseOutput?.courseName}
                </div>
                <div className="overflow-y-auto flex-1 no-scrollbar cursor-pointer">
                    {course?.courseOutput?.chapters?.map((chapter, index) => (
                        <div key={index} onClick={() => {
                            setSelectedChapterIndex(index);
                            getSelectedChapterContent(index);
                        }}>
                            <ChapterListCard
                                chapter={chapter}
                                index={index}
                                isSelected={selectedChapterIndex === index}
                            />
                        </div>
                    ))}
                </div>
            </aside>

            <main className="flex-1 bg-gradient-to-b from-zinc-900 to-zinc-950 text-white p-6 md:p-10 overflow-y-auto">
                <ChapterContent chapter={course?.courseOutput?.chapters[selectedChapterIndex]} content={chapterContent} />
            </main>
        </div>
    );
};

export default CourseStart;
