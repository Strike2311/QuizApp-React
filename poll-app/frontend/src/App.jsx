import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePoll from './pages/CreatePoll';
import VotePoll from './pages/VotePoll';
import ViewResults from './pages/ViewResults';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreatePoll />} />
        <Route path="/poll/:id" element={<VotePoll />} />
        <Route path="/results/:id" element={<ViewResults />} />
      </Routes>
    </Router>
  );
}
