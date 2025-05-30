'use client';

import {
    Home,
    BookOpen,
    BrainCircuit,
    LogOut,
    Wallet2
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import clsx from 'clsx';
import { Progress } from '@/components/ui/progress';

const Sidebar = () => {
    const pathname = usePathname();

    const menuList = [
        { id: 1, name: 'Home', icon: Home, path: '/dashboard' },
        { id: 2, name: 'My Courses', icon: BookOpen, path: '/dashboard/explore' },
        { id: 3, name: 'Upgrade', icon: Wallet2, path: '/dashboard/billing' },
        { id: 6, name: 'Logout', icon: LogOut, path: '/sign-out' }
    ];

    return (
        <aside className="fixed h-full w-64 bg-[#0d0d0d] text-white shadow-2xl p-6">
            <Link
                href="/"
                className="block text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent hover:opacity-90 transition duration-300 mb-6"
            >
                GPTutor
            </Link>

            <hr className="border-t-2 border-white/30 dark:border-white/40 rounded mb-6" />

            <nav className="space-y-2">
                {menuList.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <Link
                            key={item.id}
                            href={item.path}
                            className={clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition',
                                isActive
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                                    : 'hover:bg-white/10 text-gray-400 hover:text-white'
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-lg font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="absolute bottom-10 w-[80%]">
                <Progress
                    value={35}
                    className="h-3 rounded-full bg-gray-700/50 mb-3"
                    style={{ boxShadow: '0 0 8px rgba(128, 90, 213, 0.6)' }}
                />
                <h2 className="text-md font-semibold text-gray-300 mb-1">3 out of 5 courses created</h2>
                <h3 className="text-sm text-gray-400">Upgrade your plan for unlimited course generation</h3>
            </div>
        </aside>
    );
};

export default Sidebar;
