"use client";

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const AddNewCourse = () => {
    const { user } = useUser();

    return (
        <section className="max-w-4xl mx-auto mt-3 px-6 py-12 bg-gradient-to-r from-purple-800 via-pink-700 to-purple-900 rounded-3xl shadow-lg text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-extrabold tracking-tight mb-2">
                        Welcome{' '}
                        <span className="bg-gradient-to-r from-pink-400 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                            {user?.fullName || 'Guest'}
                        </span>
                        !
                    </h2>
                    <p className="text-lg text-purple-200 max-w-xl">
                        Ready to create your next amazing AI-powered course? Let's get started and empower learners worldwide.
                    </p>
                </div>
                <div>
                    <Link href={"/create-course"}>
                    <Button className="uppercase cursor-pointer px-8 py-4 text-lg font-bold tracking-wider">
                        + Create AI Course
                    </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AddNewCourse;
