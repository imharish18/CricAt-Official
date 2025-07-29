import React from 'react';
import { Link } from 'react-router-dom';
import { useCricAt } from '../context/CricAtContext';
import { FaPlus } from 'react-icons/fa';

const TeamCard = ({ team }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
    <div className="w-20 h-20 bg-blue-500 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-2">
      {team.name.charAt(0)}
    </div>
    <h3 className="text-xl font-bold">{team.name}</h3>
    <p>{team.players.length} Players</p>
    <div className="mt-2 text-sm text-gray-400">
      Won: {team.stats.won} | Lost: {team.stats.lost}
    </div>
  </div>
);

export const TeamList = () => {
  const { teams } = useCricAt();
  return (
    <div>
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Teams ({teams.length})</h1>
        <Link to="/teams/create" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2">
          <FaPlus /> <span>Create New Team</span>
        </Link>
      </div>
      {teams.length === 0 ? (
        <p>No teams created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map(team => <TeamCard key={team.id} team={team} />)}
        </div>
      )}
    </div>
  );
};