import React from 'react'
import { motion } from 'framer-motion'
import { useMatch } from "../MatchContext";

export default function GetMatches() {
    const { matchaData } = useMatch();
    const matchData = JSON.parse(localStorage.getItem('matchData'));
    console.log(matchData);
    return (
        <div className="flex flex-col w-full h-[85vh] justify-center items-center">
            <div className='mb-10 text-3xl font-semibold'>Here's your matches!</div>
            <div>
                <div class="flex gap-10 justify-center">
                    {matchData.map((match, index) => (
                        <motion.div
                            key={match.id || index} // Use a unique key if available
                            className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                            style={{ width: "30vw" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 * index }} // Delay for animation effect
                        >
                            <h4 className="text-2xl font-semibold mb-4 text-indigo-600">
                                {match.first_name + " " + match.last_name} {/* Use match properties */}
                            </h4>
                            <p className="text-gray-600">{match.description || "No description available."}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
