import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewCard({interview}) {
    const router = useRouter();

    const onStart = ()=>{
        router.push("dashboard/interview/"+interview?.mockId);
    }
    const onFeedback = ()=>{
        router.push("dashboard/interview/"+interview?.mockId+"/feedback");
    }
    let formattedDate = "N/A";
    if (interview?.createdAt) {
        try {
        const [day, month, year] = interview.createdAt.split("-"); // "28-08-2025"
        const dateObj = new Date(`${year}-${month}-${day}T${new Date().toLocaleTimeString("en-US", { hour12: false })}`); 
        formattedDate = dateObj.toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        } catch (err) {
        console.error("Date parse error:", err);
        }
    }

    return (
    <div className="border shadow-sm rounded-lg p-3">
        <h2 className="font-bold text-fuchsia-500">{interview?.jobPosition}</h2>
        <h2 className="text-sm text-gray-700">Years of Experience: {interview?.jobExperience}</h2>
        <h2 className="text-xs text-gray-500">
            Taken On: {formattedDate}</h2>
        
        <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline" 
            className="border-2 border-fuchsia-500"
            onClick={onFeedback}>Feedback</Button>
            <Button size="sm" 
            className="bg-fuchsia-500"
            onClick={onStart}>Start Again</Button>
        </div>
    </div>
  )
}

export default InterviewCard