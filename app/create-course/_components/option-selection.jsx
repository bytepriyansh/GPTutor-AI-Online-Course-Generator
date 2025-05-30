'use client';

import React, { useContext } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { UserInputContext } from '@/app/_contexts/UserInputContext';

const OptionSelection = () => {

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
            transition={{ duration: 0.4 }}
            className="px-6 md:px-20 lg:px-44 mt-10"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                    <Label htmlFor="difficulty" className="text-lg text-white font-semibold">
                        Select your course difficulty
                    </Label>
                    <Select
                        onValueChange={(value) => handleInputChange("difficulty", value)}
                        defaultValue={userCourseInput?.difficulty}
                    >
                        <SelectTrigger
                            id="difficulty"
                            className="w-full h-14 text-lg font-medium bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                        >
                            <SelectValue placeholder="Choose difficulty" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                            <SelectItem value="beginner" className="text-base">Beginner</SelectItem>
                            <SelectItem value="intermediate" className="text-base">Intermediate</SelectItem>
                            <SelectItem value="advanced" className="text-base">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="duration" className="text-lg text-white font-semibold">
                        Select your course duration
                    </Label>
                    <Select
                        defaultValue={userCourseInput?.duration}
                        onValueChange={(value) => handleInputChange("duration", value)}  >
                        <SelectTrigger
                            id="duration"
                            className="w-full h-14 text-lg font-medium bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                        >
                            <SelectValue placeholder="Choose duration" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                            <SelectItem value="1_hour" className="text-base">1 Hour</SelectItem>
                            <SelectItem value="3_hour" className="text-base">3 Hour</SelectItem>
                            <SelectItem value="8_hour" className="text-base">8 Hour</SelectItem>
                            <SelectItem value="12_hour" className="text-base">12 Hour</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="includeVideo" className="text-lg text-white font-semibold">
                        Include YouTube videos?
                    </Label>
                    <Select defaultValue={userCourseInput?.displayVideo}
                        onValueChange={(value) => handleInputChange("displayVideo", value)}>
                        <SelectTrigger
                            id="includeVideo"
                            className="w-full h-14 text-lg font-medium bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                        >
                            <SelectValue placeholder="Include videos?" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                            <SelectItem value="yes" className="text-base">Yes</SelectItem>
                            <SelectItem value="no" className="text-base">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3 md:col-span-3">
                    <Label htmlFor="numChapters" className="text-lg text-white font-semibold">
                        Number of Chapters
                    </Label>
                    <Input
                        defaultValue={userCourseInput?.chapters}
                        onChange={(e) => handleInputChange("chapters", e.target.value)}
                        type="number"
                        id="numChapters"
                        placeholder="Enter number of chapters"
                        min={1}
                        className="w-full h-14 text-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default OptionSelection;
