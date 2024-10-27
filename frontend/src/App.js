import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";

import LandingPage from "./pages/LandingPage"
import CreateAccount from "./pages/CreateAccount";
import AskQuestion from "./pages/AskQuestion";
import GetMatches from "./pages/GetMatches";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/get-matches" element={<GetMatches />} />
      </Routes>
    </Router>
  );
}

export default App;

