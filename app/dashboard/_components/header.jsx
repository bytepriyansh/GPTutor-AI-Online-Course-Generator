import { UserButton } from '@clerk/nextjs';
import { BrainCircuit } from 'lucide-react';
import React from 'react';

const Header = () => {
    return (
        <header className="w-full bg-[#0f0f0f] text-white px-6 py-4 border-b border-gray-800 shadow-sm">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <BrainCircuit size={40} />
                </div>

                <div className="hidden md:block text-center text-gray-400 italic text-lg">
                    “Empowering every learner with intelligent teaching.”
                </div>

                <div className="flex items-center">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </header>
    );
};

export default Header;
