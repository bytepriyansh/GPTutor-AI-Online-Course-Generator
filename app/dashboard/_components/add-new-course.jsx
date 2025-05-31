"use client";

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Plus, Zap } from 'lucide-react';
import { UserCourseListContext } from '@/app/_contexts/UserCourseListContext';

const AddNewCourse = () => {
    const { user } = useUser();
    const { userCourseList } = useContext(UserCourseListContext);
    const hasReachedLimit = userCourseList?.length > 5;

    return (
        <section className="max-w-5xl mx-auto mt-6 px-8 py-10 bg-gray-950 rounded-xl border border-gray-800 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Welcome, <span className="text-purple-400">{user?.fullName || 'Guest'}</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl">
                        {hasReachedLimit ? (
                            "Upgrade to create more courses"
                        ) : (
                            "Ready to create your next AI-powered masterpiece?"
                        )}
                    </p>
                    {hasReachedLimit && (
                        <p className="text-sm text-purple-300">
                            You've reached your free tier limit (5 courses)
                        </p>
                    )}
                </div>
                <div>
                    <Link href={hasReachedLimit ? "/billing" : "/create-course"}>
                        <Button
                            className={`px-10 py-5 text-md font-semibold tracking-wide
                                ${hasReachedLimit ?
                                    "bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-700 hover:to-yellow-500 border border-yellow-400 shadow-md shadow-yellow-900/30 hover:shadow-yellow-400" :
                                    "bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-700 hover:to-purple-500 border border-purple-400 shadow-md shadow-purple-900/30 hover:shadow-purple-400"
                                }
                                transition-all cursor-pointer group`}
                        >
                            {hasReachedLimit ? (
                                <>
                                    <Zap className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                                    <span className="relative">
                                        Upgrade Now
                                        <span className="absolute bottom-0 left-0 w-full h-px bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Plus className="mr-3 h-5 w-5 transition-transform group-hover:rotate-90" />
                                    <span className="relative">
                                        Create Course
                                        <span className="absolute bottom-0 left-0 w-full h-px bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                    </span>
                                </>
                            )}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AddNewCourse;