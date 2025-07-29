import React, { useState } from 'react';
import { useCricAt } from '../context/CricAtContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const MatchSetup = () => {
  const { teams, initializeMatch } = useCricAt();
  const navigate = useNavigate();

  const [teamAId, setTeamAId] = useState('');
  const [teamBId, setTeamBId] = useState('');
  const [overs, setOvers] = useState(10);
  const [tossWinner, setTossWinner] = useState(null);
  const [decision, setDecision] = useState(null);
  
  const handleToss = () => {
    if (!teamAId || !teamBId || teamAId === teamBId) {
      toast.error('Please select two different teams.');
      return;
    }
    const winner = Math.random() < 0.5 ? teamAId : teamBId;
    setTossWinner(winner);
    toast.success(`${teams.find(t=>t.id===winner).name} won the toss!`);
  };
  
  const handleStartMatch = () => {
    const config = {
      teamA: teams.find(t => t.id === teamAId),
      teamB: teams.find(t => t.id === teamBId),
      overs: Number(overs),
      toss: { wonBy: tossWinner, chose: decision },
    };
    initializeMatch(config);
    navigate('/live-match');
  };

  const validTeams = teams.filter(t => t.players && t.players.length >= 2);

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg space-y-6">
      <h1 className="text-3xl font-bold text-center">Match Setup</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <select value={teamAId} onChange={e => setTeamAId(e.target.value)} className="w-full p-2 bg-gray-700 rounded">
          <option value="">Select Team A</option>
          {validTeams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select value={teamBId} onChange={e => setTeamBId(e.target.value)} className="w-full p-2 bg-gray-700 rounded">
          <option value="">Select Team B</option>
          {validTeams.filter(t => t.id !== teamAId).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <label className="block">
        <span className="font-medium">Overs: {overs}</span>
        <input type="range" min="1" max="50" value={overs} onChange={e => setOvers(e.target.value)} className="w-full h-2 bg-gray-700 rounded-lg" />
      </label>

      {!tossWinner && (
        <button onClick={handleToss} className="w-full py-2 bg-yellow-500 text-black font-bold rounded">Toss</button>
      )}

      {tossWinner && !decision && (
        <div className="text-center">
            <p className="mb-2">{teams.find(t=>t.id===tossWinner).name} chooses to...</p>
            <button onClick={() => setDecision('bat')} className="py-2 px-6 bg-green-600 rounded font-bold mr-2">Bat</button>
            <button onClick={() => setDecision('bowl')} className="py-2 px-6 bg-blue-600 rounded font-bold">Bowl</button>
        </div>
      )}

      {decision && (
        <button onClick={handleStartMatch} className="w-full py-3 bg-red-600 rounded font-bold text-lg animate-pulse">START MATCH</button>
      )}
    </div>
  );
};