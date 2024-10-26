import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to PennPals</h1>
      <p className="text-xl mb-8">
        Connect with peers, share advice, and grow together.
      </p>
      <div>
        <Link
          to="/get-advice"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg mr-4"
        >
          Get Advice
        </Link>
        <Link
          to="/give-advice"
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Give Advice
        </Link>
      </div>
    </div>
  );
}
