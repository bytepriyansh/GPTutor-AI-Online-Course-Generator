import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from 'react-hot-toast';

const DropDownEllipsis = ({ children, handleDeleteCourse }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        handleDeleteCourse();
        setIsDeleteModalOpen(false);
        toast.success("Course deleted successfully!")
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleDeleteClick}>
                        <div className="flex items-center gap-2 text-red-600">
                            <Trash2 className="w-4 h-4" /> Delete
                        </div>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Confirm Deletion</DialogTitle>
                        <DialogDescription className={"text-white"}>
                            Are you sure you want to delete this course? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-lg text-gray-300">
                            All data associated with this course will be permanently removed.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="hover:bg-gray-100 cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmDelete}
                            className=" cursor-pointer bg-red-500 hover:bg-red-400"
                        >
                            Delete Course
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DropDownEllipsis;