'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';
import {
    Home,
    BookOpen,
    BrainCircuit,
    LogOut,
    Wallet2
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { Progress } from '@/components/ui/progress';
import { UserCourseListContext } from '@/app/_contexts/UserCourseListContext';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useUser();
    const { userCourseList } = useContext(UserCourseListContext);
    const [showSignOutModal, setShowSignOutModal] = useState(false);

    const menuList = [
        { id: 1, name: 'Home', icon: Home, path: '/dashboard' },
        { id: 3, name: 'Upgrade', icon: Wallet2, path: '/dashboard/billing' },
        { id: 4, name: 'Logout', icon: LogOut, path: '#', action: () => setShowSignOutModal(true) }
    ];

    return (
        <>
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
                            <button
                                key={item.id}
                                onClick={item.action ? item.action : () => router.push(item.path)}
                                className={clsx(
                                    'flex items-center cursor-pointer gap-3 px-4 py-3 rounded-lg transition w-full text-left',
                                    isActive
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                                        : 'hover:bg-white/10 text-gray-400 hover:text-white'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="text-lg font-medium">{item.name}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-10 w-[80%]">
                    <Progress
                        value={(userCourseList?.length / 5) * 100}
                        className="h-3 rounded-full bg-gray-700/50 mb-3"
                        style={{ boxShadow: '0 0 8px rgba(128, 90, 213, 0.6)' }}
                    />
                    <h2 className="text-md font-semibold text-gray-300 mb-1">{userCourseList?.length} out of 5 courses created</h2>
                    <h3 className="text-sm text-gray-400">Upgrade your plan for unlimited course generation</h3>
                </div>
            </aside>

            {/* Sign Out Confirmation Modal */}
            <Dialog open={showSignOutModal} onOpenChange={setShowSignOutModal}>
                <DialogContent className="sm:max-w-[425px] bg-[#0d0d0d] border-gray-800">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">Sign Out</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Are you sure you want to sign out?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-gray-300">
                            You'll need to sign in again to access your account.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowSignOutModal(false)}
                            className="border-gray-700 text-white hover:bg-gray-800"
                        >
                            Cancel
                        </Button>
                        <SignOutButton signOutCallback={() => router.push('/')}>
                            <Button
                                variant="destructive"
                                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white"
                            >
                                Sign Out
                            </Button>
                        </SignOutButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Sidebar;