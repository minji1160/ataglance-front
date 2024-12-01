import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CardnewsList from "./components/CardnewsList";
import CardnewsDetail from "./components/CardnewsDetail";
import AdminPage from "./components/AdminPage";
import SavedNews from "./components/SavedNews";

function App() {
  return (
    <div id="root" className="mobile-container">
    <Router>
      <Routes>
        <Route path="/" element={<CardnewsList />} />
        <Route path="/detail/:id" element={<CardnewsDetail />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;