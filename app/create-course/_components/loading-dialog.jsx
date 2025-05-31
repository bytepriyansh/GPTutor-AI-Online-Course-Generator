import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import React from "react";

const LoadingDialog = ({ loading }) => {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent className="border-none bg-gradient-to-br from-[#1e1e2f] to-[#2d2d44] shadow-2xl rounded-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="sr-only">Generating Course</AlertDialogTitle>

                    <AlertDialogDescription>
                        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
                            <div className="relative mb-8">
                                <div className="absolute inset-0 w-[120px] h-[120px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 blur-2xl animate-ping z-0" />
                                <Image
                                    src="/progress.gif"
                                    alt="AI Loader"
                                    width={100}
                                    height={100}
                                    className="relative z-10 rounded-full shadow-xl"
                                />
                            </div>

                            <h2 className="text-white text-2xl font-semibold animate-pulse">
                                Generating your magical course ✨
                            </h2>
                            <p className="mt-3 text-gray-300 text-sm max-w-md leading-relaxed">
                                Hold on tight! Our AI is carefully crafting a unique and engaging course tailored just for you.
                            </p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LoadingDialog;
