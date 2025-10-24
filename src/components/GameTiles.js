import React from 'react';
import Tile from './Tile';
import './GameTiles.css';
import mafiaBg from '../assets/mafia-background.png';

const games = [
  {
    title: 'Mafia',
    subtitle: 'The classic game of deception',
    backgroundImage: mafiaBg,
    path: '/mafia', // This path is important
  },
  // Add more games here in the future
];

const GameTiles = () => {
  return (
    <div className="game-tiles">
      {games.map((game, index) => (
        <Tile
          key={index}
          title={game.title}
          subtitle={game.subtitle}
          backgroundImage={game.backgroundImage}
          path={game.path}
        />
      ))}
    </div>
  );
};

export default GameTiles;