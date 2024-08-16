# Fantasy Football App Overview

## Project Structure
fantasy-football-app/
├── public/
├── src/
│   ├── components/
│   │   ├── PlayerCard.js
│   │   ├── PlayerRanking.js
│   ├── data/
│   │   └── players.json
│   ├── App.js
│   ├── index.js
│   ├── App.css
│   └── index.css
└── package.json
## Components

**App.js**
- Main container. Handles data aggregation, player search, and linking components.
- Links to `PlayerCard` for detailed player view and `PlayerRanking` for positional rankings.

**PlayerCard.js**
- Displays player details, including career and seasonal stats with tabs.
- Receives data from `App.js` when a player is selected.

**PlayerRanking.js**
- Shows positional rankings (QB, RB, WR, TE) based on average fantasy points (PPR).
- Receives sorted player data from `App.js`.

## Data Handling
- Data sourced from `players.json`.
- Aggregated in `App.js` to compute career and seasonal stats.
- Players ranked by average fantasy points (PPR).

## Styling
- **Global**: `App.css`
- **Component-Specific**: `PlayerRanking.css`

## Key Functionalities
- **Player Search**: Search by name.
- **Positional Ranking**: Ranked by average fantasy points (PPR).
- **Detailed Player View**: Career and season stats with charts.
