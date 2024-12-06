import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { auth, db } from '../firebase';
import { set, ref, update, get, child } from 'firebase/database';
import axios from 'axios';


export default function GetMatches() {
    const matchData = JSON.parse(localStorage.getItem('matchData'));


    const [userid, setid] = useState();

    if (!userid)
        auth.onAuthStateChanged(function (user) {
        setid(user.uid);
        })

    function choosePerson(i) {
        let person = matchData[i];
        
        let personEmail = person.email;
        let personName = person.first_name;

        update(ref(db, `users/${userid}/`), {
            partnerEmail: personEmail,
            partnerName: personName,
        });


        get(child(ref(db), `/users/`)).then((snapshot) => {
            if (snapshot.exists()) {
              let stuff = snapshot.val();
              
              let allIDs = Object.keys(stuff);

              var result = allIDs.filter(id => {
                return stuff[id].email === personEmail
              })

              console.log(personEmail)
              console.log(result)

              update(ref(db, `users/${result}/`), {
                partnerEmail: stuff[userid].email,
                partnerName: stuff[userid].name,
            });
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error?.response?.data);
          });

          window.location.href = "/dashboard"
        
    }


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
                            onClick={() => choosePerson(index)}
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
