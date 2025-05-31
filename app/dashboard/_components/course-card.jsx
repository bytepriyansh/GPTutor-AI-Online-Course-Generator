"use client"

import Image from "next/image";
import React from "react";
import { Book, BookOpen, DiffIcon, EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DropDownEllipsis from "./dropdown";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";


const CourseCard = ({ course, refreshData }) => {
    const { courseName, numberOfChapters, level, category } = course?.courseOutput || {};

    const handleDeleteCourse = async () => {
        const resp = await db.delete(CourseList).where(eq(CourseList.id, course?.id)).returning({ id: CourseList?.id });

        if (resp) {
            refreshData();
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-300 flex flex-col min-h-[430px]">
            <Image
                src="/placeholder.png"
                alt="Course Image"
                width={500}
                height={220}
                className="w-full h-[200px] object-cover"
            />

            <div className="p-5 flex flex-col justify-between flex-1">
                <div className="space-y-2">
                    <h2 className="text-xl font-bold flex flex-none justify-between text-white line-clamp-2">{courseName}
                        <DropDownEllipsis handleDeleteCourse={() => handleDeleteCourse()} >                        <EllipsisVerticalIcon className="flex-none cursor-pointer" />
                        </DropDownEllipsis>                    </h2>

                    <div className="flex flex-wrap gap-2">
                        <span className="bg-green-600/10 text-green-400 text-xs px-2 py-1 rounded-md border border-green-700">
                            {category || "Uncategorized"}
                        </span>
                        <span className="bg-purple-600/10 text-purple-400 text-xs px-2 py-1 rounded-md border border-purple-700">
                            {level || "Unknown Level"}
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-300 px-2 py-3 rounded-md bg-zinc-800/80 border border-zinc-700">
                    <div className="flex items-center gap-2">
                        <Book size={16} />
                        {numberOfChapters || 0} Chapters
                    </div>
                </div>

<Link href={`/course/${course?.courseId}`}>
                <Button
                    variant="secondary"
                    className="mt-5 cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:brightness-110 text-white w-full transition-all font-medium"
                    >
                    <BookOpen size={16} className="mr-2" />
                    View Course
                </Button>
                    </Link>
            </div>
        </div>
    );
};

export default CourseCard;
