'use client';

import { SignIn } from '@clerk/nextjs';
import { Sparkles, BookText, UserCheck } from 'lucide-react';

export default function Page() {
    return (
        <div className="grid h-screen grid-cols-1 lg:grid-cols-2 bg-background text-foreground transition-colors duration-300">
            <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 px-16 py-20 text-white">
                <div>
                    <h1 className="text-5xl font-extrabold tracking-tight flex items-center gap-3">
                        <Sparkles size={42} className="text-yellow-300 animate-pulse" />
                        Welcome to <span className="ml-2 text-yellow-100">GPTutor</span>
                    </h1>
                    <p className="mt-6 text-xl font-medium text-white/90 leading-relaxed">
                        <BookText className="inline mr-2" size={24} />
                        Generate AI-powered personalized courses, study plans, and quizzes in seconds.
                    </p>
                    <p className="mt-6 text-md text-white/80">
                        <UserCheck className="inline mr-2" size={20} />
                        Already registered? Use your credentials to log in securely.
                    </p>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center px-8 py-16">
                <div className="w-full max-w-md space-y-6 text-center">
                    <h2 className="text-4xl font-bold tracking-tight">Sign in to GPTutor</h2>
                    <p className="text-lg text-muted-foreground">
                        Enter your account credentials below to continue
                    </p>
                    <div className="rounded-xl border border-muted p-6 shadow-lg bg-card">
                        <SignIn path="/sign-in" routing="path" />
                    </div>
                </div>
            </div>
        </div>
    );
}
