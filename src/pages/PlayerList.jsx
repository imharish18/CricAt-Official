import React from 'react';
import { useCricAt } from '../context/CricAtContext';

const PlayerCard = ({ player }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow flex items-center space-x-4">
    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold">
      {player.fullName.charAt(0)}
    </div>
    <div>
      <h3 className="text-xl font-bold">{player.fullName}</h3>
      <p className="text-gray-400">{player.role}</p>
      <p className="text-sm">{player.battingStyle} | {player.bowlingStyle}</p>
    </div>
  </div>
);

export const PlayerList = () => {
  const { players } = useCricAt();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Registered Players ({players.length})</h1>
      {players.length === 0 ? (
        <p>No players registered yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.map(player => <PlayerCard key={player.id} player={player} />)}
        </div>
      )}
    </div>
  );
};