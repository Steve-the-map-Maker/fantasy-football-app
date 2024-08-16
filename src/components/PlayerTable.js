import React, { useState } from 'react';
import './PlayerTable.css';

const PlayerTable = ({ players, onPlayerSelect }) => {
  const [filter, setFilter] = useState({ position: '', minPPR: 0 });
  const [activeTab, setActiveTab] = useState('career');
  const [sortConfig, setSortConfig] = useState({ key: 'avg_fantasy_points_ppr', direction: 'descending' });

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
    let sortedPlayers = filteredPlayers;

    if (activeTab !== 'career') {
      sortedPlayers = filteredPlayers.map(player => {
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

    // Sorting logic
    if (sortConfig !== null) {
      sortedPlayers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortedPlayers;
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const displayedPlayers = getDisplayedPlayers();

  return (
    <div className="player-table-container">
      <h2>Player Table</h2>
      <div className="filter-controls">
        <label>
          Position:
          <select value={filter.position} onChange={handlePositionChange} className="form-control">
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
            className="form-control"
          />
        </label>
      </div>

      <div className="tabs">
        {availableTabs.map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active btn btn-primary' : 'btn btn-secondary'}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'career' ? 'Career' : `Season ${tab}`}
          </button>
        ))}
      </div>

      {/* Responsive table wrapper */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>Name</th>
              <th onClick={() => handleSort('position')}>Position</th>
              <th onClick={() => handleSort('team')}>Team</th>
              <th onClick={() => handleSort('avg_fantasy_points_ppr')}>Avg PPR</th>
              <th onClick={() => handleSort('fantasy_points_ppr')}>Total PPR</th>
              <th onClick={() => handleSort('std_dev_fantasy_points_ppr')}>Std Dev PPR</th>
            </tr>
          </thead>
          <tbody>
            {displayedPlayers.map(player => (
              <tr key={player.id} onClick={() => onPlayerSelect(player)}>
                <td><strong> {player.name} </strong></td>
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
    </div>
  );
};

export default PlayerTable;