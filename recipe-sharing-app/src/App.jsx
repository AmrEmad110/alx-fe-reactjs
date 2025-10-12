// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";

const Home = () => (
  <div>
    <h1>Recipe Sharing App</h1>
    <SearchBar />
    <RecipeList />
  </div>
);

const About = () => <h1>About Page</h1>;

export default function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
