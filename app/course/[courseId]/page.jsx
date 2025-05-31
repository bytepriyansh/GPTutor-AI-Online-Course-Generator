"use client";

import CourseBasicInfo from '@/app/create-course/[courseId]/_components/course-basic-info';
import CourseDetail from '@/app/create-course/[courseId]/_components/course-detail';
import Header from '@/app/dashboard/_components/header';
import { db } from '@/config/db';
import { CourseList } from '@/config/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';

const ViewCourse = ({ params }) => {

    const [course, setCourse] = useState();

    useEffect(() => {
        params && getCourse();
    }, [params]);

    const getCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId));

        console.log(result);
        setCourse(result[0]);
    };

    return (
        <div>
            <Header />
            <div className="px-10 p-10 md:px-20 lg:px-44">
                <CourseBasicInfo course={course} edit={false} />
                <CourseDetail course={course} />
            </div>
        </div>
    );
};

export default ViewCourse;