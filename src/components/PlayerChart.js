import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PlayerChart = ({ player, season }) => {
  let weeks, fantasyPoints;

  if (season) {
    const seasonData = player.seasonStats[season];
    weeks = seasonData.weeks.map(week => `Week ${week.week}`);
    fantasyPoints = seasonData.weeks.map(week => week.fantasy_points_ppr);
  } else {
    weeks = player.careerWeeks.map(week => `Week ${week.week}`);
    fantasyPoints = player.careerWeeks.map(week => week.fantasy_points_ppr);
  }

  const data = {
    labels: weeks,
    datasets: [
      {
        label: 'Fantasy Points (PPR)',
        data: fantasyPoints,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>{season ? `Fantasy Points Per Week for ${season}` : 'Career Fantasy Points Per Week'}</h2>
      <Line data={data} />
    </div>
  );
};

export default PlayerChart;
