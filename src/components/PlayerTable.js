import React, { useState } from 'react';

const PlayerTable = ({ players, onPlayerSelect }) => {
  const [filter, setFilter] = useState({ position: '', minPPR: 0 });
  const [activeTab, setActiveTab] = useState('career');

  const handlePositionChange = (event) => {
    setFilter({ ...filter, position: event.target.value });
  };

  const handlePPRChange = (event) => {
    setFilter({ ...filter, minPPR: event.target.value });
  };

  const calculateStandardDeviation = (pointsArray) => {
    if (pointsArray.length === 0) return 0;

    const mean = pointsArray.reduce((acc, val) => acc + val, 0) / pointsArray.length;
    const variance = pointsArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / pointsArray.length;
    return Math.sqrt(variance);
  };

  const filteredPlayers = players.filter(player => 
    (filter.position === '' || player.position === filter.position) &&
    player.avg_fantasy_points_ppr >= filter.minPPR
  );

  // Gather all unique seasons across all players
  const allSeasons = new Set();
  players.forEach(player => {
    Object.keys(player.seasonStats).forEach(season => {
      allSeasons.add(season);
    });
  });

  const availableTabs = ['career', ...Array.from(allSeasons).sort()];

  const getDisplayedPlayers = () => {
    if (activeTab === 'career') {
      return filteredPlayers;
    } else {
      return filteredPlayers.map(player => {
        const seasonData = player.seasonStats[activeTab];
        if (seasonData) {
          const stdDev = calculateStandardDeviation(seasonData.weeks.map(week => week.fantasy_points_ppr));
          return {
            ...player,
            avg_fantasy_points_ppr: seasonData.avg_fantasy_points_ppr,
            fantasy_points_ppr: seasonData.fantasy_points_ppr,
            std_dev_fantasy_points_ppr: stdDev,
          };
        }
        return null;
      }).filter(player => player !== null);
    }
  };

  const displayedPlayers = getDisplayedPlayers();

  return (
    <div>
      <h2>Player Table</h2>
      <div>
        <label>
          Position:
          <select value={filter.position} onChange={handlePositionChange}>
            <option value="">All</option>
            <option value="QB">QB</option>
            <option value="RB">RB</option>
            <option value="WR">WR</option>
            <option value="TE">TE</option>
          </select>
        </label>
        <label>
          Minimum PPR:
          <input
            type="number"
            value={filter.minPPR}
            onChange={handlePPRChange}
            step="0.1"
          />
        </label>
      </div>

      <div className="tabs">
        {availableTabs.map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'career' ? 'Career' : `Season ${tab}`}
          </button>
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
            <th>Avg PPR</th>
            <th>Total PPR</th>
            <th>Std Dev PPR</th>
          </tr>
        </thead>
        <tbody>
          {displayedPlayers.map(player => (
            <tr key={player.id} onClick={() => onPlayerSelect(player)}>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.team}</td>
              <td>{player.avg_fantasy_points_ppr ? player.avg_fantasy_points_ppr.toFixed(2) : 'N/A'}</td>
              <td>{player.fantasy_points_ppr ? player.fantasy_points_ppr.toFixed(2) : 'N/A'}</td>
              <td>{player.std_dev_fantasy_points_ppr ? player.std_dev_fantasy_points_ppr.toFixed(2) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
