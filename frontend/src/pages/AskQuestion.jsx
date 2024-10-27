import React, { useState } from 'react'

export default function AskQuestion() {
    const [question, setQuestion] = useState("");

    return (
        <div className="w-full flex h-[90vh] flex-col items-center justify-center">
            <p className='text-3xl font-semibold mb-5'>What's on your mind?</p>
            <textarea
                placeholder="Question"
                style={{
                    border: "purple solid 2px",
                    fontSize: 20,
                    padding: "10px 15px",
                    outline: "none",
                    boxShadow: "none",
                    height: "10rem",
                    width: "60%",
                    borderRadius: 10, 
                }}
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
            />
            <button
                class={"mt-5 text-white px-8 py-[10px] w-[10vw] min-w-[100px] rounded-xl duration-200 " + (question ? "bg-purple-600 hover:bg-purple-700 " : "bg-purple-300 ")}
                type="submit"
            >
                Next
            </button>
        </div>
    )
}
