import React from 'react';
import './Tile.css';
import { Link } from 'react-router-dom';

const Tile = ({ title, subtitle, backgroundImage, path }) => {
  const style = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <Link to={path} className="tile-link">
      <div className={`tile ${!backgroundImage ? 'white-background' : ''}`} style={backgroundImage ? style : {}}>
        <div className="tile-content">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

export default Tile;