import React from 'react';
import { useCricAt } from '../context/CricAtContext';

export const Admin = () => {
  const { setPlayers, setTeams, setMatchConfig, setLiveMatch } = useCricAt();
  
  const handleReset = () => {
    if(window.confirm("Are you sure you want to reset all data?")) {
        setPlayers([]);
        setTeams([]);
        setMatchConfig(null);
        setLiveMatch(null);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Master Controls</h2>
        <button onClick={handleReset} className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded">
          Reset All Application Data
        </button>
        <p className="text-sm text-gray-400 mt-2">Warning: This action is irreversible and will clear all players, teams, and match data from local storage.</p>
      </div>
    </div>
  );
};