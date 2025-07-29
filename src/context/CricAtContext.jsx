import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CricAtContext = createContext();
export const useCricAt = () => useContext(CricAtContext);

// Custom hook to sync state with localStorage
const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export const CricAtProvider = ({ children }) => {
  const [players, setPlayers] = useStickyState([], 'cricat_players');
  const [teams, setTeams] = useStickyState([], 'cricat_teams');
  const [matchConfig, setMatchConfig] = useStickyState(null, 'cricat_matchConfig');
  const [liveMatch, setLiveMatch] = useStickyState(null, 'cricat_liveMatch');

  const addPlayer = (playerData) => {
    const newPlayer = {
      id: uuidv4(),
      team: null,
      stats: { matches: 0, runs: 0, wickets: 0, sixes: 0 },
      ...playerData
    };
    setPlayers(prev => [...prev, newPlayer]);
    return newPlayer;
  };
  
  const addTeam = (teamData) => {
    const newTeam = { 
      id: uuidv4(), 
      stats: { won: 0, lost: 0, NRR: 0.0 },
      ...teamData 
    };
    setTeams(prev => [...prev, newTeam]);
    return newTeam;
  };

  const updateTeam = (teamId, updatedData) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, ...updatedData } : t));
  };
  
  const initializeMatch = (config) => {
    setMatchConfig(config);
    setLiveMatch(null); // Clear previous live match data
  };

  const value = {
    players,
    addPlayer,
    teams,
    addTeam,
    updateTeam,
    matchConfig,
    initializeMatch,
    liveMatch,
    setLiveMatch
  };

  return (
    <CricAtContext.Provider value={value}>
      {children}
    </CricAtContext.Provider>
  );
};