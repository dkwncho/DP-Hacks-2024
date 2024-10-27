import React from 'react'
import { motion } from 'framer-motion'

export default function GetMatches() {
    return (
        <div className="flex flex-col w-full h-[85vh] justify-center items-center">
            <div className='mb-10 text-3xl font-semibold'>Here's your matches!</div>
            <div>
                <div class="flex gap-10 justify-center">
                    <motion.div
                        key={0}
                        className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                        style={{ width: "30vw" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 * 0.3 }}
                    >
                        <h4 className="text-2xl font-semibold mb-4 text-indigo-600">
                            DC
                        </h4>
                        <p className="text-gray-600">Studies a language that we all know and love.</p>
                    </motion.div>
                    <motion.div
                        key={0}
                        className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                        style={{ width: "30vw" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 * 0.3 }}
                    >
                        <h4 className="text-2xl font-semibold mb-4 text-indigo-600">
                            DC
                        </h4>
                        <p className="text-gray-600">Studies a language that we all know and love.</p>
                    </motion.div>
                    <motion.div
                        key={0}
                        className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                        style={{ width: "30vw" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 * 0.3 }}
                    >
                        <h4 className="text-2xl font-semibold mb-4 text-indigo-600">
                            DC
                        </h4>
                        <p className="text-gray-600">Studies a language that we all know and love.</p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
