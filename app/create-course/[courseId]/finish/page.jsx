'use client';

import { db } from '@/config/db';
import { CourseList } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { Copy, ExternalLink, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import QRCode from 'react-qr-code';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const FinishPage = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const courseId = params?.courseId;
  const router = useRouter();

  useEffect(() => {
    if (courseId && user) getCourseDetails();
  }, [courseId, user]);

  const getCourseDetails = async () => {
    const result = await db.select().from(CourseList)
      .where(and(
        eq(CourseList.courseId, courseId),
        eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
      ));
    setCourse(result[0]);
  };

  const courseLink = `${process.env.NEXT_PUBLIC_HOST_NAME}/course/${course?.courseId}/start`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(courseLink);
      toast.success("Course link copied!");
    } catch {
      toast.error("Failed to copy link!");
    }
  };

  if (!course) return null;

  return (
    <div className="min-h-screen px-4 md:px-20 py-16 flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">
      <div className="bg-zinc-900 text-white p-8 md:p-10 rounded-3xl shadow-2xl border border-zinc-800 w-full max-w-4xl space-y-10 transition-all duration-300">

        <div className="flex justify-start">
          <Button
            onClick={() => router.push('/dashboard')}
            className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-white border border-gray-600 shadow-md transition-all"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-400 animate-fade-in-down">
          🎉 Your Course is Live!
        </h1>

        <div className="space-y-4 text-center">
          <p className="text-lg text-gray-300">
            Share this beautiful course using the link below.
          </p>

          <div className="bg-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-zinc-700 shadow-inner">
            <div className="text-md text-gray-100 break-all text-left w-full">
              {courseLink}
            </div>
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                className="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white transition-all"
              >
                <Copy size={16} className="mr-2" /> Copy
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(courseLink, "_blank")}
                className="border-gray-600 cursor-pointer text-white hover:bg-zinc-700"
              >
                <ExternalLink size={16} className="mr-2" /> Open
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mt-6">
          <span className="text-lg text-gray-200">
            Scan this QR code to open the course on your phone
          </span>
          <div className="bg-white p-3 rounded-xl">
            <QRCode value={courseLink} size={140} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
