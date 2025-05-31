"use client";

import { db } from '@/config/db';
import { CourseList } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import CourseCard from './course-card';
import { UserCourseListContext } from '@/app/_contexts/UserCourseListContext';

const UserCourseList = () => {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);

    useEffect(() => {
        if (user) getUserCourses();
    }, [user]);

    const getUserCourses = async () => {
        setLoading(true);
        const result = await db.select().from(CourseList)
            .where(eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress));
        setCourseList(result);
        setUserCourseList(result);
        setLoading(false);
    };

    const skeletonCards = Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="animate-pulse bg-zinc-800 rounded-xl p-4 shadow-md">
            <div className="h-40 bg-zinc-700 rounded-md mb-4" />
            <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-zinc-700 rounded w-1/2" />
        </div>
    ));

    return (
        <section className="mt-12 px-4 md:px-10 lg:px-16">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">📚 My Courses</h2>
                <p className="text-sm text-gray-400">
                    {loading
                        ? "Loading..."
                        : courseList.length > 0
                            ? `${courseList.length} course${courseList.length > 1 ? 's' : ''}`
                            : "No courses found"}
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skeletonCards}
                </div>
            ) : courseList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courseList.map((course, index) => (
                        <CourseCard course={course} key={index} refreshData={() => getUserCourses()} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 mt-20">
                    <p className="text-lg">You haven't created any courses yet.</p>
                </div>
            )}
        </section>
    );
};

export default UserCourseList;
