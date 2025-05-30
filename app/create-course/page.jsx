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

    useEffect(() => {
        console.log(userCourseInput);
    }, [userCourseInput]);

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
        if (userCourseInput?.length === 0) {
            return true;
        }
        if (activeIndex === 0 && (userCourseInput?.category?.length === 0 || userCourseInput?.category === undefined)) {
            return true;
        }
        if (activeIndex === 1 && (userCourseInput?.topic?.length === 0 || userCourseInput?.topic === undefined)) {
            return true;
        }
        else if (activeIndex === 2 && (userCourseInput?.difficulty === undefined || userCourseInput?.duration || userCourseInput?.displayVideo === undefined || userCourseInput?.chapters === undefined)) {
            return true;
        }

        return false;
    };
    return (
        <section className="px-6 py-12 max-w-5xl mx-auto">
            <div className="mb-12 relative">
                <div className="absolute left-0 top-0">
                    <Link href="/dashboard">
                        <Button variant="default" className="flex items-center gap-2 cursor-pointer">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

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
                        onClick={() => toast.success('Course Layout Generated!')}
                        className="bg-green-600 hover:bg-green-700 cursor-pointer text-white text-base font-semibold px-6 py-2 rounded-lg transition-all duration-300 shadow-md animate-pulse"
                    >
                        ✨ Generate Course Layout
                    </Button>
                )}
            </div>
        </section>
    );
};

export default CreateCourse;
