'use client';

import categoryList from '@/app/_shared/category-list';
import Image from 'next/image';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { UserInputContext } from '@/app/_contexts/UserInputContext';

const CategorySelection = () => {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleCategoryChange = (category) => {
        setUserCourseInput(prev => ({
            ...prev,
            category: category
        }));
    };

    return (
        <div className="px-4 md:px-10 mt-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 tracking-wide">
                Select Your Category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {categoryList.map((item, index) => {
                    const isSelected = userCourseInput.category === item.name;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => handleCategoryChange(item.name)}
                            className={`
                                flex flex-col items-center p-6 rounded-xl shadow-lg transition-all duration-300 cursor-pointer 
                                border-2
                                ${isSelected
                                    ? 'border-pink-500 bg-gradient-to-br from-purple-700 via-pink-600 to-purple-900 shadow-pink-500/30 scale-105'
                                    : 'border-gray-700 bg-white/5 hover:border-pink-500 hover:bg-gradient-to-br from-purple-700 via-pink-600 to-purple-900'}
                            `}
                        >
                            <Image
                                src={item.icon}
                                width={60}
                                height={60}
                                alt={item.name}
                                className="mb-4"
                            />
                            <h3 className={`text-lg font-semibold text-center 
                                ${isSelected ? 'text-white' : 'text-white/80'}
                            `}>
                                {item.name}
                            </h3>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategorySelection;
