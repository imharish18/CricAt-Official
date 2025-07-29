import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCricAt } from '../context/CricAtContext';

export const RegisterPlayer = () => {
  const { addPlayer } = useCricAt();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '', mobile: '', email: '', role: 'All-Rounder', 
    battingStyle: 'Right-Handed', bowlingStyle: 'Right-arm Medium',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile) {
      toast.error('Full Name and Mobile are required.');
      return;
    }
    addPlayer(formData);
    toast.success(`${formData.fullName} registered successfully!`);
    navigate('/players');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Register New Player</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg space-y-4">
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required />
        <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 bg-gray-700 rounded" />
        <select name="role" onChange={handleChange} defaultValue="All-Rounder" className="w-full p-2 bg-gray-700 rounded">
          <option>Batsman</option><option>Bowler</option><option>All-Rounder</option><option>Wicket-Keeper</option>
        </select>
        <select name="battingStyle" onChange={handleChange} defaultValue="Right-Handed" className="w-full p-2 bg-gray-700 rounded">
          <option>Right-Handed</option><option>Left-Handed</option>
        </select>
        <select name="bowlingStyle" onChange={handleChange} defaultValue="Right-arm Medium" className="w-full p-2 bg-gray-700 rounded">
          <option>Right-arm Fast</option><option>Right-arm Medium</option><option>Left-arm Fast</option><option>Spin</option><option>None</option>
        </select>
        <button type="submit" className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 rounded font-bold">Register</button>
      </form>
    </div>
  );
};