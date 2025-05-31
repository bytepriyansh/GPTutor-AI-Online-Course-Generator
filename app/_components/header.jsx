"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

const Header = () => {

    const {user}=useUser()

    return (
        <header className="w-full border-b shadow-md shadow-white bg-background sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <Link
                        href="/"
                        className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-gray-700 bg-clip-text text-transparent hover:opacity-90 transition duration-300"
                    >
                        GPTutor
                    </Link>

                    <div className="flex items-center space-x-4">
                        <ModeToggle />
                        {user && <Link href="/dashboard">
                            <Button variant="outline" className="hover:bg-gray-400 cursor-pointer transition-all">
                                Dashboard
                            </Button>
                        </Link>}
                        
                        <SignedOut>
                            <SignInButton>
                                <Button variant="default" className=" cursor-pointer hover:bg-gray-400 transition-all">
                                    Get Started
                                </Button>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
