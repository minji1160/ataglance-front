import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsList from "./components/NewsList";
import NewsDetail from "./components/NewsDetail";

function App() {
  return (
    <div id="root" className="mobile-container">
    <Router>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/detail/:id" element={<NewsDetail />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;