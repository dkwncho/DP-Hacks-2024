import React, { useState } from 'react'
import { auth } from '../firebase'

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    function handleLogin(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password).then((response) => {
        window.location.href = '/dashboard';
        }).catch((e) => {
            console.log(e)
            setError(true)
        })
    }

    return (
        <>
        <div className="flex flex-col justify-center align-center w-full h-[85vh]">
        <form onSubmit={(e) => { if (email && password) handleLogin(e) }} className="flex items-center gap-5 w-full flex-col">
              <input
                placeholder="Email"
                // autoFocus
                style={{
                  borderBottom: "solid 2px",
                  borderImageSlice: "1",
                  borderImageSource: "linear-gradient(to left, #B37BD5, #823FAA)",
                  flexGrow: 1,
                  fontSize: 20,
                  padding: "10px 15px",
                  width: "40%",
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
                <input
                placeholder="Password"
                type="password"
                style={{
                  borderBottom: "solid 2px",
                  borderImageSlice: "1",
                  borderImageSource: "linear-gradient(to left, #B37BD5, #823FAA)",
                  flexGrow: 1,
                  fontSize: 20,
                  padding: "10px 15px",
                  width: "40%",
                }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            {error && <><div>Something went wrong!</div></>}
              <button
                class={"mt-5 text-white px-8 py-[10px] w-[10vw] min-w-[100px] rounded-xl duration-200 " + (email ? "bg-purple-600 hover:bg-purple-700 " : "bg-purple-300 ")}
                type="submit"
              >
                Log In
              </button>
            </form>
        </div>
        </>
    )
}
