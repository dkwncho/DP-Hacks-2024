import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import heroImage from "../assets/penn-campus.jpeg";

export default function LandingPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    });
  
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
  
        <header className="sticky top-0 z-50 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg">
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
              <ul className="flex space-x-6">
                {[
                  { name: "About", href: "#about" },
                  { name: "Features", href: "#features" },
                  { name: "Sign Up", href: "/create-account" },
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
  
        <main>
          <section className="hero relative h-screen flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <img
                src={heroImage}
                alt="UPenn Campus"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 text-center text-white max-w-3xl mx-auto px-4">
              <motion.h2
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                PennPals
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl mb-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Valuable advice at an affordable price
              </motion.p>
              <Link to="/create-account">
                <motion.button
                  className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </section>
  
          <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-4">
              <h3 className="text-4xl font-bold mb-16 text-center text-indihlwgo-600">
                About PennPals
              </h3>
              <p className="text-xl text-center max-w-3xl mx-auto">
                PennPals is a platform designed to connect University of
                Pennsylvania students with peers and alumni for advice,
                mentorship, and support. Whether you're looking for academic
                guidance, career insights, or just someone to talk to, PennPals is
                here to help you navigate your journey at Penn.
              </p>
            </div>
          </section>
  
          <section id="features" className="py-24 bg-gray-100">
            <div className="container mx-auto px-4">
              <h3 className="text-4xl font-bold mb-16 text-center text-indigo-600">
                How PennPals Works
              </h3>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Anonymous Matching",
                    description:
                      "Share your questions or concerns anonymously, and get matched with experienced peers who can help.",
                    icon: "🔍",
                  },
                  {
                    title: "AI-Powered Connections",
                    description:
                      "Our advanced AI processes your interests to find the best matches for meaningful conversations.",
                    icon: "🤖",
                  },
                  {
                    title: "Diverse Support Network",
                    description:
                      "Connect with upperclassmen and alumni for academic, social, and general life advice at UPenn.",
                    icon: "🌐",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-5xl mb-6">{feature.icon}</div>
                    <h4 className="text-2xl font-semibold mb-4 text-indigo-600">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
  
          <section
            id="sign-up"
            className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          >
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-4xl font-bold mb-6">Join PennPals Today</h3>
                <p className="text-xl mb-10 max-w-2xl mx-auto">
                  Start your journey towards success at UPenn with the support of
                  experienced peers.
                </p>
                <Link to="/signup">
                  <motion.button
                    className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up Now
                  </motion.button>
                </Link>
                <p className="mt-6 text-lg">
                  Already have an account?{" "}
                  <Link to="/login" className="underline hover:text-gray-200">
                    Log in here
                  </Link>
                </p>
              </motion.div>
            </div>
          </section>
        </main>
  
        <footer className="bg-gray-800 text-white text-center py-8">
          <p>&copy; 2024 PennPals. All rights reserved.</p>
        </footer>
      </div>
    );
  }