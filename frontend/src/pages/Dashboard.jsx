import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { ref, child, get } from "firebase/database";

export default function Dashboard() {
  // this is just placeholder data, will make it so it grabs the user's actual data
  const dbRef = ref(db);

  const [userid, setid] = useState();
  auth.onAuthStateChanged(function (user) {
    setid(user.uid);
  })

  const [name, setName] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [match, setMatch] = useState();
  const [adviceType, setAdviceType] = useState();

  get(child(dbRef, `users/${userid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      let stuff = snapshot.val();
      setName(stuff?.name);
      setCurrentQuestion(stuff?.question);
      setMatch(stuff?.match);
      setAdviceType(stuff?.advicePreference)

      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error?.response?.data);
  });

  let userData = {
    name: name,
    currentQuestion:
      "What are some good electives for a Computer Science major?",
    currentMatch: {
      name: "Jane Smith",
      major: "Computer Science",
      year: "Senior",
    },
    pastMatches: [
      { name: "Alice Johnson", date: "2023-04-15" },
      { name: "Bob Williams", date: "2023-03-22" },
      { name: "Carol Davis", date: "2023-02-10" },
    ],
  };

  if (userid)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
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

        <main className="container mx-auto px-4 py-8">
          <motion.h2
            className="text-4xl font-bold mb-8 text-indigo-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome, {name}!
          </motion.h2>

          {
            adviceType === "get" ?
              currentQuestion
                ? <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
                      Current Question
                    </h3>
                    <p className="text-gray-700">{currentQuestion}</p>
                  </motion.div>

                  <motion.div
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
                      Current Match
                    </h3>
                    <div className="text-gray-700">
                      <p>
                        <span className="font-semibold">Name:</span>{" "}
                        {userData.currentMatch.name}
                      </p>
                      <p>
                        <span className="font-semibold">Major:</span>{" "}
                        {userData.currentMatch.major}
                      </p>
                      <p>
                        <span className="font-semibold">Year:</span>{" "}
                        {userData.currentMatch.year}
                      </p>
                    </div>
                  </motion.div>
                </div>

                : <div>
                  <div className="grid grid-cols-1 gap-8">
                    <motion.div
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-center items-center gap-3 p-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h3 className="text-2xl font-semibold text-indigo-600">
                        You don't have an active question.
                      </h3>
                      <Link className="text-xl underline text-purple-700 hover:text-purple-900" to="/ask-question" >Ask one now!</Link>
                    </motion.div>
                  </div>
                </div>

              : currentQuestion
                ? <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
                    Current Question
                  </h3>
                  <p className="text-gray-700">{currentQuestion}</p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
                    Current Match
                  </h3>
                  <div className="text-gray-700">
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {userData.currentMatch.name}
                    </p>
                    <p>
                      <span className="font-semibold">Major:</span>{" "}
                      {userData.currentMatch.major}
                    </p>
                    <p>
                      <span className="font-semibold">Year:</span>{" "}
                      {userData.currentMatch.year}
                    </p>
                  </div>
                </motion.div>
              </div>
                : <div>
                  <div className="grid grid-cols-1 gap-8">
                    <motion.div
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-center items-center gap-3 p-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h3 className="text-2xl font-semibold text-indigo-600">
                        You don't have an active advisee.
                      </h3>
                      <p className="text-xl underline" to="/ask-question" >Stay tuned!</p>
                    </motion.div>
                  </div>
                </div>
          }



          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
              Past Matches
            </h3>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userData.pastMatches.map((match, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {match.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {match.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/ask-question"
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors inline-block"
            >
              Ask a New Question
            </Link>
          </motion.div>
        </main>
      </div>
    );
}
