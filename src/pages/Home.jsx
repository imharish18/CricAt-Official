import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to CricAt</h1>
      <p className="text-xl text-gray-400 mb-8">Your modern cricket management platform.</p>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-green-400">Campus Premier League (CPL)</h2>
        <p className="mt-2 mb-4">The ultimate campus cricket tournament is here. Register your team now!</p>
        <div className="flex justify-center space-x-4">
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register as Player
          </Link>
          <Link to="/teams/create" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Create a Team
          </Link>
        </div>
      </div>
    </div>
  );
};