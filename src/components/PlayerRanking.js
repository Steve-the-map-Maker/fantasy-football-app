// components/PlayerRanking.js
import React from 'react';
import './PlayerRanking.css';

const PlayerRanking = ({ players }) => {
  const positions = ['QB', 'RB', 'WR', 'TE'];

  return (
    <div className="player-ranking">
      <h2>Positional Rankings</h2>
      {positions.map(position => (
        <div key={position}>
          <h3>{position}</h3>
          <div className="ranking-list">
            {players
              .filter(player => player.position === position)
              .map((player, index) => (
                <div key={player.id} className="ranking-item">
                  <span>{index + 1}. {player.name} - {player.avg_fantasy_points_ppr.toFixed(2)} PPR</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerRanking;
