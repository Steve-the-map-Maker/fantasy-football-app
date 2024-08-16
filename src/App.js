import React, { useState, useEffect } from 'react';
import PlayerCard from './components/PlayerCard';
import playersData from './data/players.json'; 
import PlayerTable from './components/PlayerTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    // Aggregate player data to summarize the entire career
    const aggregatedData = Object.keys(playersData).map(name => {
      const playerStats = playersData[name];
      const totalWeeks = playerStats.length;
      const summary = playerStats.reduce((acc, game) => {
        acc.completions += game.completions;
        acc.attempts += game.attempts;
        acc.passing_yards += game.passing_yards;
        acc.passing_tds += game.passing_tds;
        acc.interceptions += game.interceptions;
        acc.carries += game.carries;
        acc.rushing_yards += game.rushing_yards;
        acc.rushing_tds += game.rushing_tds;
        acc.rushing_fumbles += game.rushing_fumbles;
        acc.receptions += game.receptions;
        acc.targets += game.targets;
        acc.receiving_yards += game.receiving_yards;
        acc.receiving_tds += game.receiving_tds;
        acc.receiving_fumbles += game.receiving_fumbles;
        acc.fantasy_points += game.fantasy_points;
        acc.fantasy_points_ppr += game.fantasy_points_ppr;

        // Collect season stats
        if (!acc.seasonStats[game.season]) {
          acc.seasonStats[game.season] = {
            completions: 0,
            attempts: 0,
            passing_yards: 0,
            passing_tds: 0,
            interceptions: 0,
            carries: 0,
            rushing_yards: 0,
            rushing_tds: 0,
            rushing_fumbles: 0,
            receptions: 0,
            targets: 0,
            receiving_yards: 0,
            receiving_tds: 0,
            receiving_fumbles: 0,
            fantasy_points: 0,
            fantasy_points_ppr: 0,
            weeks: [],
            totalWeeks: 0,
          };
        }

        acc.seasonStats[game.season].completions += game.completions;
        acc.seasonStats[game.season].attempts += game.attempts;
        acc.seasonStats[game.season].passing_yards += game.passing_yards;
        acc.seasonStats[game.season].passing_tds += game.passing_tds;
        acc.seasonStats[game.season].interceptions += game.interceptions;
        acc.seasonStats[game.season].carries += game.carries;
        acc.seasonStats[game.season].rushing_yards += game.rushing_yards;
        acc.seasonStats[game.season].rushing_tds += game.rushing_tds;
        acc.seasonStats[game.season].rushing_fumbles += game.rushing_fumbles;
        acc.seasonStats[game.season].receptions += game.receptions;
        acc.seasonStats[game.season].targets += game.targets;
        acc.seasonStats[game.season].receiving_yards += game.receiving_yards;
        acc.seasonStats[game.season].receiving_tds += game.receiving_tds;
        acc.seasonStats[game.season].receiving_fumbles += game.receiving_fumbles;
        acc.seasonStats[game.season].fantasy_points += game.fantasy_points;
        acc.seasonStats[game.season].fantasy_points_ppr += game.fantasy_points_ppr;
        acc.seasonStats[game.season].weeks.push({
          week: game.week,
          fantasy_points_ppr: game.fantasy_points_ppr,
        });
        acc.seasonStats[game.season].totalWeeks += 1;

        // Collect career week stats
        if (!acc.careerWeeks[game.week]) {
          acc.careerWeeks[game.week] = {
            week: game.week,
            fantasy_points_ppr: 0,
          };
        }
        acc.careerWeeks[game.week].fantasy_points_ppr += game.fantasy_points_ppr;

        return acc;
      }, {
        id: playerStats[0].id,
        name: name,
        position: playerStats[0].position,
        team: playerStats[0].team,
        completions: 0,
        attempts: 0,
        passing_yards: 0.0,
        passing_tds: 0,
        interceptions: 0.0,
        carries: 0,
        rushing_yards: 0.0,
        rushing_tds: 0,
        rushing_fumbles: 0.0,
        receptions: 0,
        targets: 0,
        receiving_yards: 0.0,
        receiving_tds: 0,
        receiving_fumbles: 0.0,
        fantasy_points: 0.0,
        fantasy_points_ppr: 0.0,
        seasonStats: {},
        careerWeeks: [],
      });

      // Calculate average fantasy points
      summary.avg_fantasy_points = summary.fantasy_points / totalWeeks;
      summary.avg_fantasy_points_ppr = summary.fantasy_points_ppr / totalWeeks;

      // Calculate average fantasy points for each season
      Object.keys(summary.seasonStats).forEach(season => {
        const seasonData = summary.seasonStats[season];
        seasonData.avg_fantasy_points = seasonData.fantasy_points / seasonData.totalWeeks;
        seasonData.avg_fantasy_points_ppr = seasonData.fantasy_points_ppr / seasonData.totalWeeks;
      });

      // Convert careerWeeks object to an array
      summary.careerWeeks = Object.values(summary.careerWeeks);

      return summary;
    });

    // Rank players by average fantasy points
    aggregatedData.sort((a, b) => b.avg_fantasy_points_ppr - a.avg_fantasy_points_ppr);

    setPlayers(aggregatedData);
  }, [playersData]);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = players.filter(player =>
      player.name.toLowerCase().includes(term.toLowerCase())
    );
    if (filtered.length === 1) {
      setSelectedPlayer(filtered[0]);
    } else {
      setSelectedPlayer(null);
    }
  };
  const handleClosePlayerCard = () => {
    setSelectedPlayer(null);
  };
  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
  };

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App" style={{ display: 'flex' }}>
      <div style={{ flex: 2 }}>
        <input
          type="text"
          placeholder="Search for a player..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
        />
        <PlayerTable players={filteredPlayers} onPlayerSelect={handlePlayerSelect} />
      </div>
      <div style={{ flex: 1 }}>
        {selectedPlayer && <PlayerCard player={selectedPlayer} onClose={handleClosePlayerCard} />}
      </div>
    </div>
  );
};

export default App;