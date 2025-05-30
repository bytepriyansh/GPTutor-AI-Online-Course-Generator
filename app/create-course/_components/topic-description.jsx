'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { UserInputContext } from '@/app/_contexts/UserInputContext';

const TopicDescription = () => {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleInputChange = (fieldName, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mt-10 space-y-8 px-4 md:px-0"
        >
            <div className="space-y-2">
                <Label htmlFor="topic" className="text-white text-base font-medium">
                    What topic should your course be about?
                </Label>
                <Input
                    defaultValue={userCourseInput?.topic}
                    onChange={(e) => handleInputChange("topic", e.target.value)}
                    id="topic"
                    placeholder="e.g., Yoga, Programming, Creativity"
                    className="bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description" className="text-white text-base font-medium">
                    Add a short description (What will this course teach?)
                </Label>
                <Textarea
                    defaultValue={userCourseInput?.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    id="description"
                    placeholder="Briefly describe the course goals, outcomes, or highlights..."
                    className="min-h-[150px] resize-none bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                />
            </div>
        </motion.div>
    );
};

export default TopicDescription;
