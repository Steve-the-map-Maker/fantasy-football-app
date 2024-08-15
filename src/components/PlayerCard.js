import React, { useState } from 'react';
import './PlayerCard.css';
import PlayerChart from './PlayerChart';

const PlayerCard = ({ player }) => {
  const [activeTab, setActiveTab] = useState('career');
  const seasonStats = Object.keys(player.seasonStats).map(season => ({
    season,
    ...player.seasonStats[season]
  }));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const careerAverages = (
    <div className="tab-content">
      <h2>Career Totals and Averages</h2>
      <p><strong>Team:</strong> {player.team}</p>
      <p><strong>Position:</strong> {player.position}</p>
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
      <div className="chart-container">
        <PlayerChart player={player} />
      </div>
    </div>
  );

  const seasonTotals = (
    <div className="tab-content">
      <h2>Season Totals and Averages</h2>
      <div className="tabs">
        {seasonStats.map(season => (
          <button
            key={season.season}
            className={activeTab === season.season ? 'active' : ''}
            onClick={() => handleTabChange(season.season)}
          >
            {season.season}
          </button>
        ))}
      </div>
      <div>
        {seasonStats.find(season => season.season === activeTab) && (
          <div>
            <p><strong>Season:</strong> {activeTab}</p>
            <p><strong>Completions:</strong> {seasonStats.find(season => season.season === activeTab).completions}</p>
            <p><strong>Attempts:</strong> {seasonStats.find(season => season.season === activeTab).attempts}</p>
            <p><strong>Passing Yards:</strong> {seasonStats.find(season => season.season === activeTab).passing_yards}</p>
            <p><strong>Passing Touchdowns:</strong> {seasonStats.find(season => season.season === activeTab).passing_tds}</p>
            <p><strong>Interceptions:</strong> {seasonStats.find(season => season.season === activeTab).interceptions}</p>
            <p><strong>Carries:</strong> {seasonStats.find(season => season.season === activeTab).carries}</p>
            <p><strong>Rushing Yards:</strong> {seasonStats.find(season => season.season === activeTab).rushing_yards}</p>
            <p><strong>Rushing Touchdowns:</strong> {seasonStats.find(season => season.season === activeTab).rushing_tds}</p>
            <p><strong>Rushing Fumbles:</strong> {seasonStats.find(season => season.season === activeTab).rushing_fumbles}</p>
            <p><strong>Receptions:</strong> {seasonStats.find(season => season.season === activeTab).receptions}</p>
            <p><strong>Targets:</strong> {seasonStats.find(season => season.season === activeTab).targets}</p>
            <p><strong>Receiving Yards:</strong> {seasonStats.find(season => season.season === activeTab).receiving_yards}</p>
            <p><strong>Receiving Touchdowns:</strong> {seasonStats.find(season => season.season === activeTab).receiving_tds}</p>
            <p><strong>Receiving Fumbles:</strong> {seasonStats.find(season => season.season === activeTab).receiving_fumbles}</p>
            <p><strong>Fantasy Points:</strong> {seasonStats.find(season => season.season === activeTab).fantasy_points}</p>
            <p><strong>Fantasy Points (PPR):</strong> {seasonStats.find(season => season.season === activeTab).fantasy_points_ppr}</p>
            <p><strong>Average Fantasy Points:</strong> {seasonStats.find(season => season.season === activeTab).avg_fantasy_points.toFixed(2)}</p>
            <p><strong>Average Fantasy Points (PPR):</strong> {seasonStats.find(season => season.season === activeTab).avg_fantasy_points_ppr.toFixed(2)}</p>
            <div className="chart-container">
              <PlayerChart player={player} season={activeTab} />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="player-card">
      <h1>{player.name}</h1>
      <div className="tabs">
        <button
          className={activeTab === 'career' ? 'active' : ''}
          onClick={() => handleTabChange('career')}
        >
          Career
        </button>
        {seasonStats.map(season => (
          <button
            key={season.season}
            className={activeTab === season.season ? 'active' : ''}
            onClick={() => handleTabChange(season.season)}
          >
            {season.season}
          </button>
        ))}
      </div>
      {activeTab === 'career' ? careerAverages : seasonTotals}
    </div>
  );
};

export default PlayerCard;
