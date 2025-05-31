'use client';
import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

const ChapterRoadmap = ({ chapters }) => {
    return (
        <div className="relative border-l-[3px] border-zinc-700 ml-4 space-y-10 mt-6 pl-6">
            {chapters.map((chapter, index) => (
                <div key={index} className="relative group">
                    <div className="absolute -left-[22px] top-1.5 w-4 h-4 rounded-full bg-zinc-300 ring-4 ring-zinc-900"></div>

                    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 shadow-md flex justify-between items-start gap-4 transition-all duration-300 hover:border-zinc-500">
                        <div>
                            <h3 className="text-lg font-semibold text-purple-300 mb-1">
                                {index + 1}. {chapter.chapter_name}
                            </h3>
                            <p className="text-md flex-none text-zinc-300 leading-relaxed">
                                {chapter.about}
                            </p>
                            {chapter.duration && (
                                <div className="flex items-center text-md text-blue-400 mt-3">
                                    <Clock size={14} className="mr-1" />
                                    {chapter.duration} min
                                </div>
                            )}
                        </div>
                        <CheckCircle className=" flex-none mt-1" size={22} />
                    </div>
                </div>
            ))}
        </div>
    );
};

const CourseDetail = ({ course }) => {
    return (
        <div className="border border-zinc-800 bg-zinc-950 p-6 rounded-xl shadow-2xl mt-3 text-white">
            {course?.courseOutput?.chapters?.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6 text-teal-400 border-b border-zinc-700 pb-2">
                        Chapter Roadmap (Cannot Edit it 😬)
                    </h2>
                    <ChapterRoadmap chapters={course.courseOutput.chapters} />
                </div>
            )}
        </div>
    );
};

export default CourseDetail;
