import { Clock } from 'lucide-react';
import React from 'react';

const ChapterListCard = ({ chapter, index, isSelected }) => {
    return (
        <div
            className={`group border-b border-zinc-800 p-4 transition-colors duration-200 ${isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-black scale-[1.02]'
                    : 'hover:bg-zinc-900'
                }`}
        >
            <div className="flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-full font-bold text-lg flex items-center justify-center shadow-md ${isSelected ? 'bg-black text-emerald-400' : 'bg-emerald-500 text-white'
                    }`}>
                    {index + 1}
                </div>

                <div className="flex-1">
                    <h2 className={`text-lg font-semibold mb-1 ${isSelected ? 'text-black' : 'text-emerald-300'
                        }`}>
                        {chapter?.chapter_name}
                    </h2>
                    <p className={`text-sm ${isSelected ? 'text-black' : 'text-zinc-300'}`}>
                        {chapter?.about}
                    </p>
                    <div className={`flex items-center gap-2 mt-1 text-sm font-medium ${isSelected ? 'text-orange-700' : 'text-orange-400'
                        }`}>
                        <Clock size={18} />
                        {chapter?.duration} minutes
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChapterListCard;
