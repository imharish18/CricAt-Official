import React, { useState, useEffect } from 'react';
import { useCricAt } from '../context/CricAtContext';
import { useNavigate } from 'react-router-dom';

export const LiveMatch = () => {
  const { matchConfig, players, liveMatch, setLiveMatch } = useCricAt();
  const navigate = useNavigate();

  useEffect(() => {
    if (!matchConfig) {
      navigate('/match-setup');
      return;
    }
    if (!liveMatch) {
      // Initialize First Innings
      const { teamA, teamB, toss } = matchConfig;
      const battingTeam = toss.chose === 'bat' ? teamA : teamB;
      const bowlingTeam = toss.chose === 'bat' ? teamB : teamA;
      setLiveMatch({
        innings: 1,
        battingTeam,
        bowlingTeam,
        score: 0,
        wickets: 0,
        overs: 0,
        balls: 0,
        strikerId: battingTeam.players[0].id,
        nonStrikerId: battingTeam.players[1].id,
        bowlerId: bowlingTeam.players[0].id,
        thisOver: [],
        timeline: [],
        status: 'live',
      });
    }
  }, [matchConfig, liveMatch, navigate, setLiveMatch]);

  if (!liveMatch) return <p>Loading Match...</p>;
  
  const striker = players.find(p => p.id === liveMatch.strikerId);
  const nonStriker = players.find(p => p.id === liveMatch.nonStrikerId);
  const bowler = players.find(p => p.id === liveMatch.bowlerId);
  
  const handleScore = (run) => {
    let newLiveMatch = { ...liveMatch };
    newLiveMatch.score += run;
    newLiveMatch.balls += 1;
    newLiveMatch.thisOver.push(run);
    
    // Rotate strike on odd runs
    if(run === 1 || run === 3) {
        [newLiveMatch.strikerId, newLiveMatch.nonStrikerId] = [newLiveMatch.nonStrikerId, newLiveMatch.strikerId];
    }
    
    // End of over
    if(newLiveMatch.balls % 6 === 0) {
        newLiveMatch.overs += 1;
        newLiveMatch.timeline.push({ over: newLiveMatch.overs, balls: newLiveMatch.thisOver });
        newLiveMatch.thisOver = [];
        [newLiveMatch.strikerId, newLiveMatch.nonStrikerId] = [newLiveMatch.nonStrikerId, newLiveMatch.strikerId];
        // Add logic for next bowler
    }
    setLiveMatch(newLiveMatch);
  };
  
  const handleWicket = () => {
    let newLiveMatch = { ...liveMatch };
    newLiveMatch.wickets += 1;
    newLiveMatch.balls += 1;
    newLiveMatch.thisOver.push('W');
    
    if (newLiveMatch.wickets < 10) {
        const nextBatsmanIndex = newLiveMatch.battingTeam.players.findIndex(p => p.id === newLiveMatch.strikerId) + newLiveMatch.wickets + 1; // Simplified
        newLiveMatch.strikerId = newLiveMatch.battingTeam.players[nextBatsmanIndex]?.id || newLiveMatch.nonStrikerId;
    } else {
        newLiveMatch.status = 'innings_break';
    }
    setLiveMatch(newLiveMatch);
  };
  
  return (
    <div className="space-y-4">
      {/* Scoreboard */}
      <div className="bg-gray-800 p-4 rounded-lg text-center">
        <h2 className="text-xl font-bold">{liveMatch.battingTeam.name} vs {liveMatch.bowlingTeam.name}</h2>
        <div className="text-5xl font-bold my-2">{liveMatch.score} / {liveMatch.wickets}</div>
        <div className="text-xl">{Math.floor(liveMatch.balls/6)}.{liveMatch.balls%6} Overs</div>
      </div>
      
      {/* Players */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-800 p-2 rounded">Striker: {striker?.fullName}</div>
        <div className="bg-gray-800 p-2 rounded">Non-striker: {nonStriker?.fullName}</div>
        <div className="bg-gray-800 p-2 rounded">Bowler: {bowler?.fullName}</div>
      </div>

      {/* This Over */}
      <div className="flex justify-center space-x-2">
        {liveMatch.thisOver.map((b, i) => <span key={i} className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${b==='W'?'bg-red-500':'bg-gray-600'}`}>{b}</span>)}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-4 gap-2">
        {[0,1,2,3,4,6].map(r => <button key={r} onClick={()=>handleScore(r)} className="bg-blue-600 p-3 rounded">{r}</button>)}
        <button onClick={handleWicket} className="bg-red-600 p-3 rounded col-span-2">Wicket</button>
      </div>
    </div>
  );
};