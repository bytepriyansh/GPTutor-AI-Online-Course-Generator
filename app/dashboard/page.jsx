import React from 'react';
import AddNewCourse from './_components/add-new-course';
import UserCourseList from './_components/user-course-list';

const Dashboard = () => {
    return (
        <div>
            <AddNewCourse />
            {/* diaplying list of course */}
            <UserCourseList />
        </div>
    );
};

export default Dashboard;