// components/PlayerComparison.js
import React from 'react';
import './PlayerComparison.css';

const PlayerComparison = ({ players }) => {
  if (players.length < 2) return null;

  return (
    <div className="player-comparison">
      <h2>Player Comparison</h2>
      <div className="comparison-grid">
        {players.map(player => (
          <div key={player.id} className="player-card">
            <h3>{player.name}</h3>
            <p><strong>Position:</strong> {player.position}</p>
            <p><strong>Team:</strong> {player.team}</p>
            <p><strong>Completions:</strong> {player.completions}</p>
            <p><strong>Attempts:</strong> {player.attempts}</p>
            <p><strong>Passing Yards:</strong> {player.passing_yards}</p>
            <p><strong>Passing Touchdowns:</strong> {player.passing_tds}</p>
            <p><strong>Interceptions:</strong> {player.interceptions}</p>
            <p><strong>Carries:</strong> {player.carries}</p>
            <p><strong>Rushing Yards:</strong> {player.rushing_yards}</p>
            <p><strong>Rushing Touchdowns:</strong> {player.rushing_tds}</p>
            <p><strong>Rushing Fumbles:</strong> {player.rushing_fumbles}</p>
            <p><strong>Receptions:</strong> {player.receptions}</p>
            <p><strong>Targets:</strong> {player.targets}</p>
            <p><strong>Receiving Yards:</strong> {player.receiving_yards}</p>
            <p><strong>Receiving Touchdowns:</strong> {player.receiving_tds}</p>
            <p><strong>Receiving Fumbles:</strong> {player.receiving_fumbles}</p>
            <p><strong>Fantasy Points:</strong> {player.fantasy_points}</p>
            <p><strong>Fantasy Points (PPR):</strong> {player.fantasy_points_ppr}</p>
            <p><strong>Average Fantasy Points:</strong> {player.avg_fantasy_points.toFixed(2)}</p>
            <p><strong>Average Fantasy Points (PPR):</strong> {player.avg_fantasy_points_ppr.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerComparison;
