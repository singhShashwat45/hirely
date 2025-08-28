"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React from 'react'
import { useEffect, useState } from 'react';
import InterviewCard from './InterviewCard';

function InterviewList() {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);
    useEffect(()=>{
        user && GetInterviewList();
    }, [user]);

    const GetInterviewList = async()=>{
        const result = await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(MockInterview.id));
        console.log(result);
        setInterviewList(result);
    }

    if(interviewList.length == 0){
        return(
            <div></div>
        )
    }
  return (
    <div>
        <h2 className="font-medium text-xl">
            Previous Attempted Interviews</h2>
        <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-5 my-5">
            {interviewList && interviewList.map((interview, index)=>(
                <InterviewCard key = {index}
                interview = {interview}></InterviewCard>    
            ))}
        </div>
    </div>
  )
}

export default InterviewList