import React, { createContext, useContext, useState } from 'react';

const MatchContext = createContext();

export const useMatch = () => {
    return useContext(MatchContext);
};

export const MatchProvider = ({ children }) => {
    const [matchData, setMatchData] = useState([]);

    return (
        <MatchContext.Provider value={{ matchData, setMatchData }}>
            {children}
        </MatchContext.Provider>
    );
};
