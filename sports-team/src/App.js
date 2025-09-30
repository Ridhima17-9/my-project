import React, { useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const players = [
    { id: 1, name: "Virat Kohli", role: "Batsman" },
    { id: 2, name: "MS Dhoni", role: "Wicket Keeper" },
    { id: 3, name: "Rohit Sharma", role: "Batsman" },
    { id: 4, name: "Jasprit Bumrah", role: "Bowler" },
    { id: 5, name: "Hardik Pandya", role: "All-Rounder" },
  ];

  const filteredPlayers = players.filter((player) =>
    player.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Sports Team</h2>
      <input
        type="text"
        placeholder="Search by role (e.g., Bowler)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredPlayers.map((player) => (
          <li key={player.id}>
            <strong>{player.name}</strong> — {player.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
