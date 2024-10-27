import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { set, ref, update } from 'firebase/database';
import axios from 'axios';

export default function AskQuestion() {
    const [question, setQuestion] = useState("");

    const [userid, setid] = useState();

    if (!userid)
        auth.onAuthStateChanged(function (user) {
        setid(user.uid);
        })

    async function handleSubmit() {

        try {
            const response = await axios.post('http://127.0.0.1:5000/api/questions', {
                question: question
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            console.log('Response from server:', response.data);
        
            update(ref(db, `users/${userid}/`), {
                question: question
            });
        
            // window.location.href = "/dashboard";
        
        } catch (error) {
            console.error('Error submitting question:', error);
        }

    }

    return (
        <>
            <header className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <motion.h1
                        className="text-3xl font-bold text-indigo-600"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        PennPals
                    </motion.h1>
                    <nav>
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            Logout
                        </Link>
                    </nav>
                </div>
            </header>
            <div className="w-full flex h-[90vh] flex-col items-center justify-center gap-10">
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
                    onClick={() => {handleSubmit()}}
                >
                    Submit
                </button>
            </div>
        </>
    )
}
