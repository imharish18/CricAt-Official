import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CricAtProvider } from './context/CricAtContext';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { RegisterPlayer } from './pages/RegisterPlayer';
import { PlayerList } from './pages/PlayerList';
import { TeamList } from './pages/TeamList';
import { CreateTeam } from './pages/CreateTeam';
import { MatchSetup } from './pages/MatchSetup';
import { LiveMatch } from './pages/LiveMatch';
import { Admin } from './pages/Admin';

function App() {
  return (
    <CricAtProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }} />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPlayer />} />
            <Route path="/players" element={<PlayerList />} />
            <Route path="/teams" element={<TeamList />} />
            <Route path="/teams/create" element={<CreateTeam />} />
            <Route path="/match-setup" element={<MatchSetup />} />
            <Route path="/live-match" element={<LiveMatch />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </CricAtProvider>
  );
}

export default App;