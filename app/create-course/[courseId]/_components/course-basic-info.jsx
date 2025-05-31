'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
    BadgeCheck,
    Clock,
    Film,
    BookOpenText,
    Puzzle,
    Layers3,
    ArrowDown,
} from 'lucide-react';
import EditCourseBasicInfo from './edit-course-basic-info';
import toast from 'react-hot-toast';
import Link from 'next/link';

const CourseBasicInfo = ({ course, edit = true }) => {
    const [courseData, setCourseData] = useState(course);
    const [imagePreview, setImagePreview] = useState('/placeholder.png');
    const fileInputRef = useRef(null);

    useEffect(() => {
        setCourseData(course);
    }, [course]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
        toast.success("Image Uploaded Successfully!");

    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const courseOutput = courseData?.courseOutput;

    return (
        <div className='p-6 md:p-10 bg-zinc-900 text-white rounded-2xl shadow-2xl mt-6 border border-zinc-800'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-start'>
                <div className='space-y-6'>
                    <h1 className='text-4xl font-bold tracking-tight text-teal-400 drop-shadow flex items-center gap-3'>
                        {courseOutput?.courseName}
                        {edit ? <EditCourseBasicInfo course={courseData} onUpdate={setCourseData} />
                            : null}
                    </h1>

                    <p className='text-gray-300 text-base leading-relaxed border-l-4 border-teal-500 pl-4'>
                        {courseOutput?.description}
                    </p>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6'>
                        <InfoItem
                            icon={<Puzzle className='text-teal-400' size={20} />}
                            label='Category'
                            value={courseData?.category}
                        />
                        <InfoItem
                            icon={<Layers3 className='text-indigo-400' size={20} />}
                            label='Topic'
                            value={courseOutput?.topic}
                        />
                        <InfoItem
                            icon={<BookOpenText className='text-yellow-400' size={20} />}
                            label='Chapters'
                            value={courseOutput?.numberOfChapters}
                        />
                        <InfoItem
                            icon={<Clock className='text-pink-400' size={20} />}
                            label='Duration'
                            value={courseOutput?.totalDuration}
                        />
                        <InfoItem
                            icon={<BadgeCheck className='text-emerald-400' size={20} />}
                            label='Level'
                            value={courseOutput?.level}
                        />
                        <InfoItem
                            icon={<Film className='text-purple-400' size={20} />}
                            label='Video Included'
                            value={courseData?.includeVideo ? 'Yes' : 'No'}
                        />
                    </div>
                </div>

                <div className='w-full max-w-md mx-auto'>
                    <h2 className='text-lg font-semibold text-teal-400 mb-3 flex items-center gap-2'>
                        📤 Upload Your Own Image <span className="text-white text-sm">(Just Click this image 👇)</span>
                    </h2>

                    <div
                        className='relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-xl cursor-pointer'
                        onClick={handleImageClick}
                    >
                        <Image
                            src={imagePreview}
                            alt='Course Cover'
                            fill
                            className='object-cover rounded-xl transition-transform duration-500 hover:scale-105'
                        />
                        <input
                            type='file'
                            id='upload-image'
                            accept='image/*'
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className='hidden'
                        />
                    </div>
                </div>

                <div className='mt-10 flex justify-center'>
                    <div className='animate-bounce text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-full px-5 py-2 text-lg font-bold flex items-center gap-2 shadow-md'>
                        👇 Scroll down to explore chapters before starting
                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                    {!edit &&
                        <Link href={`/course/${course?.courseId}/start`}>
                            <button className="relative cursor-pointer text-zinc-100 font-bold text-lg px-6 py-3 rounded-full border border-zinc-600 bg-zinc-900 shadow-[0_0_15px_#00f2ff] hover:shadow-[0_0_25px_#00f2ff,0_0_50px_#00f2ff] transition-all duration-300 ease-in-out tracking-wide flex items-center gap-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                                <span className="z-10">Let's Get Learning</span>
                                <span className="absolute inset-0 rounded-full bg-cyan-400 opacity-20 blur-xl animate-pulse" />
                            </button>
                        </Link>
                    }
                </div>

            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div className='bg-zinc-800 p-4 rounded-xl flex items-center gap-3 border border-zinc-700 hover:border-teal-500 transition duration-200'>
        {icon}
        <div>
            <div className='text-sm text-gray-400'>{label}</div>
            <div className='text-md font-semibold text-white'>{value || '-'}</div>
        </div>
    </div>
);

export default CourseBasicInfo;
