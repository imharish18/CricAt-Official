import React, { useState } from 'react';
import { useCricAt } from '../context/CricAtContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const CreateTeam = () => {
  const { players, teams, addTeam, updateTeam } = useCricAt();
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState('');
  const [createdTeam, setCreatedTeam] = useState(null);

  const handleCreateTeam = (e) => {
    e.preventDefault();
    const newTeam = addTeam({ name: teamName, captain: null, players: [] });
    setCreatedTeam(newTeam);
    toast.success(`Team "${teamName}" created! Now add players.`);
  };

  const handleAddPlayer = (playerId) => {
    const team = teams.find(t => t.id === createdTeam.id);
    const isPlayerInTeam = team.players.find(p => p.id === playerId);
    if(isPlayerInTeam) {
        toast.error("Player already in team!");
        return;
    }
    const updatedPlayers = [...team.players, { id: playerId, battingOrder: team.players.length + 1 }];
    updateTeam(createdTeam.id, { players: updatedPlayers });
  };
  
  if (!createdTeam) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Create New Team</h1>
        <form onSubmit={handleCreateTeam} className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg">
          <input type="text" value={teamName} onChange={e => setTeamName(e.target.value)} placeholder="Enter Team Name" className="w-full p-2 bg-gray-700 rounded mb-4" required />
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded font-bold">Create & Add Players</button>
        </form>
      </div>
    );
  }

  const teamPlayers = createdTeam.players.map(p => p.id);
  const availablePlayers = players.filter(p => !teams.some(t => t.players.some(tp => tp.id === p.id)));

  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Roster: {createdTeam.name} ({teamPlayers.length})</h2>
        <div className="bg-gray-800 p-4 rounded-lg space-y-2">
            {createdTeam.players.map(p => {
                const pd = players.find(pl => pl.id === p.id);
                return <div key={p.id} className="bg-gray-700 p-2 rounded">{pd.fullName}</div>
            })}
        </div>
        <button onClick={() => navigate('/teams')} className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded font-bold">Done</button>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Players</h2>
         <div className="bg-gray-800 p-4 rounded-lg space-y-2">
            {availablePlayers.map(p => (
                <div key={p.id} className="flex justify-between items-center bg-gray-700 p-2 rounded">
                    <span>{p.fullName}</span>
                    <button onClick={() => handleAddPlayer(p.id)} className="bg-green-500 text-xs px-2 py-1 rounded">Add</button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};