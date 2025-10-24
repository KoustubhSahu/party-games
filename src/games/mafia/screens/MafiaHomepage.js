import React from 'react';

const MafiaHomepage = ({ players, setPlayers, onAssignRoles }) => {
  const handlePlayerNameChange = (id, name) => {
    setPlayers(players.map(p => (p.id === id ? { ...p, name } : p)));
  };

  const addPlayer = () => {
    const newPlayerId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
    setPlayers([...players, { id: newPlayerId, name: '', role: null, isAlive: true, votes: 0 }]);
  };

  const removePlayer = (id) => {
    if (players.length > 5) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="player-inputs">
        {players.map((player, index) => (
          <div key={player.id} className="player-input-row">
            <input
              type="text"
              placeholder={`Player #${index + 1}`}
              value={player.name}
              onChange={(e) => handlePlayerNameChange(player.id, e.target.value)}
            />
            {players.length > 5 && (
              <button onClick={() => removePlayer(player.id)}>−</button>
            )}
          </div>
        ))}
      </div>
      <div className="player-controls">
        <button className="btn btn-secondary" onClick={addPlayer}>Add Player</button>
        <button className="btn btn-primary" onClick={onAssignRoles}>Assign Roles</button>
      </div>
    </div>
  );
};

export default MafiaHomepage;