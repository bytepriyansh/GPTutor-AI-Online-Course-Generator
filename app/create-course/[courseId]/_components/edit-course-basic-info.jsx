'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { eq } from "drizzle-orm";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const EditCourseBasicInfo = ({ course, onUpdate }) => {
  const courseOutput = course?.courseOutput;

  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCourseName(courseOutput?.courseName || "");
    setDescription(courseOutput?.description || "");
  }, [course]);

  const onUpdateHandler = async () => {
    setLoading(true);
    if (!course?.id) {
      toast.error("Missing course ID");
      setLoading(false);
      return;
    }

    const updatedOutput = {
      ...courseOutput,
      courseName,
      description,
    };

    try {
      const result = await db
        .update(CourseList)
        .set({ courseOutput: updatedOutput })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });

      const updatedCourse = {
        ...course,
        courseOutput: updatedOutput,
      };

      onUpdate?.(updatedCourse); 
      toast.success("Update Successful!");
      setLoading(false);
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Error updating course!");
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-white hover:text-teal-400 cursor-pointer transition duration-200">
          <BsPencilSquare size={24} />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-zinc-900 text-white border border-zinc-700 shadow-2xl rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-teal-400">Edit Course Title & Description</DialogTitle>
          <DialogDescription className="text-gray-400 text-md">
            Update the main details of your course below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-lg text-gray-300">Course Title</Label>
            <Input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="mt-2 bg-zinc-800 text-white border border-zinc-700 focus:border-teal-500 focus:ring-teal-500 text-lg"
            />
          </div>

          <div>
            <Label className="text-lg text-gray-300">Course Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 bg-zinc-800 text-white border border-zinc-700 focus:border-teal-500 focus:ring-teal-500 text-md h-40"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button
              onClick={onUpdateHandler}
              disabled={loading}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg shadow-md"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" /> Updating
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseBasicInfo;
