import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to AI Hackathon DJ</h1>
      <nav>
        <ul>
          <li><Link to="/voting">Vote for a Song</Link></li>
          <li><Link to="/results">View Results</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
