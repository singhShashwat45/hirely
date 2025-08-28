"use client";
import Webcam  from 'react-webcam'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAiModel';
import { db } from '@/utils/db';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserAnswer } from '@/utils/schema';

const RecordAnswerSection = ({mockInterviewQuestions, activeQuestionIndex, interviewData}) => {
    const {user} = useUser();
    const [userAnswer, setUserAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
    useEffect(()=>{
        results.map((result)=>{
            setUserAnswer(prevAns => prevAns + result?.transcript)
        })
    },[results])

    useEffect(()=>{
        if(!isRecording && userAnswer.length > 0){
            UpdateUserAnswer();
        }
    },[userAnswer]);


    const StartStopRecording = async()=>{
        if(isRecording){
            stopSpeechToText();
            
        }else{
            startSpeechToText();        
        }
    }
    
    const UpdateUserAnswer = async () => {
        console.log(userAnswer);
        setLoading(true);

        const feedbackPrompt = `You are an interview evaluator.
        Question: ${mockInterviewQuestions[activeQuestionIndex]?.Question}
        User Answer: ${userAnswer}
        Return ONLY a valid JSON object with two fields: 
        - "rating": a string like "7/10"
        - "feedback": short feedback (3–5 lines).
        No extra text, no explanations, no markdown.
        `;

        try {
            const result = await chatSession.sendMessage(feedbackPrompt);

            let mockJsonResponse = await result.response.text();
            mockJsonResponse = mockJsonResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

            console.log("Raw AI response:", mockJsonResponse);

            let JsonFeedbackResp;
            try {
            JsonFeedbackResp = JSON.parse(mockJsonResponse);
            } catch (err) {
            console.error("JSON parse error:", err, "Response was:", mockJsonResponse);
            toast.error("AI feedback not in JSON format, please retry.");
            setLoading(false);
            return;
            }

            const resp = await db.insert(UserAnswer).values({
            question: mockInterviewQuestions[activeQuestionIndex]?.Question,
            mockIdRef: String(interviewData?.mockId),
            correctAns: mockInterviewQuestions[activeQuestionIndex]?.Answer,
            userAns: userAnswer,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
            });

            if (resp) {
            toast.success("Answer saved successfully");
            setUserAnswer("");
            setResults([]);
            }
        } catch (err) {
            console.error("UpdateUserAnswer error:", err);
            toast.error("Failed to process answer. Try again.");
        } finally {
            setLoading(false); // ✅ always reset loading, even on error
        }
    };


    return (
    <div className="flex items-center justify-center flex-col">
        <div className="flex flex-col mt-20 justify-center items-center bg-black
        rounded-lg p-5">
            <Image src={'/webcam.svg'} width={200} height={200}
            className='absolute'    />
            <Webcam
            mirrored={true}
            style={{
                height:300,
                width: '100%',
                zIndex: 10
            }}></Webcam>
        </div>
        <div>
            <Button 
            disabled={loading}
            variant = "outline" className='my-10 border-fuchsia-500'
            onClick={StartStopRecording}>
                {isRecording?
                <h2 className="text-red-700 flex gap-2"> <Mic></Mic> Stop Recording</h2>
                 : 'Record Answer'}</Button>            
        </div>
    </div>
  )
}

export default RecordAnswerSection