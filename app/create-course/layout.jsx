"use client";

import React, { useState } from 'react';
import Header from '../dashboard/_components/header';
import { UserInputContext } from '../_contexts/UserInputContext';

const CreateCourseLayout = ({ children }) => {

    const [userCourseInput, setUserCourseInput] = useState("");

    return (
        <div>
            <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
                <>
                    <Header />
                    {children}
                </>
            </UserInputContext.Provider>
        </div>
    );
};

export default CreateCourseLayout;