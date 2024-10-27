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
<header className="sticky top-0 z-50 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.h1
              className="text-3xl font-bold text-indigo-600"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => window.location.path = "/"}
            >
              PennPals
            </motion.h1>
            <nav>
              <ul className="flex space-x-6">
                {[
                  { name: "About", href: "#about" },
                  { name: "Features", href: "#features" },
                  { name: "Sign Up", href: "/signup" },
                  { name: "Login", href: "/login" },
                ].map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href}
                        className="text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-gray-600 hover:text-indigo-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        <div className="flex flex-col justify-center align-center w-full h-[80vh]">
        
        <form onSubmit={(e) => { if (email && password) handleLogin(e) }} className="flex items-center gap-5 w-full flex-col">
        <p className="text-3xl font-semibold">Welcome back!</p>
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
