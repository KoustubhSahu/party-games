import React, { useState, useEffect } from 'react';
import PlayerSelection from '../components/PlayerSelection';

const GameCycle = ({ players, setPlayers, onGameEnd, onPhaseChange }) => {
  const [phase, setPhase] = useState('NIGHT_MAFIA'); // NIGHT_MAFIA, NIGHT_DOCTOR, NIGHT_POLICE, DAY_REVEAL, DAY_VOTING, DAY_ELIMINATE
  const [nightActions, setNightActions] = useState({ mafiaKill: null, doctorSave: null, policeCheck: null });
  const [announcement, setAnnouncement] = useState({ message: '', type: '' });
  const [eliminatedPlayer, setEliminatedPlayer] = useState(null);

  const alivePlayers = players.filter(p => p.isAlive);

  // Effect to report the current phase back to the parent component (MafiaGame.js)
  useEffect(() => {
    if (onPhaseChange) {
      onPhaseChange(phase);
    }
  }, [phase, onPhaseChange]);

  // Effect to process night actions when moving to the DAY_REVEAL phase
  useEffect(() => {
    if (phase === 'DAY_REVEAL') {
      let victim = players.find(p => p.id === nightActions.mafiaKill);
      if (victim && nightActions.mafiaKill !== nightActions.doctorSave) {
        setPlayers(players.map(p => p.id === nightActions.mafiaKill ? { ...p, isAlive: false } : p));
        setAnnouncement({ message: `${victim.name} was killed last night.`, type: 'death' });
      } else {
        setAnnouncement({ message: 'The Doctor made a successful save! No one died.', type: 'success' });
      }
    }
  }, [phase]); // Dependency array ensures this only runs when 'phase' changes

  const handleSelect = (playerId) => {
    if (phase === 'NIGHT_MAFIA') setNightActions({ ...nightActions, mafiaKill: playerId });
    if (phase === 'NIGHT_DOCTOR') setNightActions({ ...nightActions, doctorSave: playerId });
    if (phase === 'NIGHT_POLICE') setNightActions({ ...nightActions, policeCheck: playerId });
  };

  const resetVotes = () => {
    setPlayers(players.map(p => ({ ...p, votes: 0 })));
  };

  const nextPhase = () => {
    if (phase === 'NIGHT_MAFIA') setPhase('NIGHT_DOCTOR');
    if (phase === 'NIGHT_DOCTOR') setPhase('NIGHT_POLICE');
    if (phase === 'NIGHT_POLICE') setPhase('DAY_REVEAL');
    if (phase === 'DAY_REVEAL') {
        resetVotes(); // Automatically reset votes before voting starts
        setPhase('DAY_VOTING');
    }
    if (phase === 'DAY_ELIMINATE') {
        const winner = onGameEnd(); // Check for a winner after elimination
        if (!winner) { // If no winner, start the next cycle
            setPhase('NIGHT_MAFIA');
            setNightActions({ mafiaKill: null, doctorSave: null, policeCheck: null });
            setAnnouncement({ message: '', type: '' });
            setEliminatedPlayer(null);
        }
    }
  };

  const handleVote = (playerId, delta) => {
    setPlayers(players.map(p =>
      p.id === playerId ? { ...p, votes: Math.max(0, p.votes + delta) } : p
    ));
  };

  const eliminatePlayer = () => {
    let maxVotes = -1;
    let playersToEliminate = [];
    alivePlayers.forEach(p => {
        if (p.votes > maxVotes) {
            maxVotes = p.votes;
            playersToEliminate = [p];
        } else if (p.votes === maxVotes && p.votes > 0) {
            playersToEliminate.push(p);
        }
    });

    if (playersToEliminate.length === 1 && maxVotes > 0) {
        const player = playersToEliminate[0];
        setPlayers(players.map(p => p.id === player.id ? { ...p, isAlive: false } : p));
        setEliminatedPlayer(player);
        setPhase('DAY_ELIMINATE');
    } else {
        alert("It's a tie or no votes were cast! No one is eliminated. Proceeding to night.");
        setPhase('NIGHT_MAFIA');
        setNightActions({ mafiaKill: null, doctorSave: null, policeCheck: null });
        setAnnouncement({ message: '', type: '' });
    }
  };

  const renderPhase = () => {
    switch (phase) {
      case 'NIGHT_MAFIA':
        return (
          <>
            <h2>Night Time: Mafia Phase</h2>
            <p>Ask the Mafia to wake up and select a player to kill.</p>
            <PlayerSelection
                players={alivePlayers}
                onSelect={handleSelect}
                selected={nightActions.mafiaKill}
                selectionStyle="mafia"
            />
            <button className="btn btn-primary" onClick={nextPhase} disabled={!nightActions.mafiaKill}>Confirm Kill</button>
          </>
        );
      case 'NIGHT_DOCTOR':
        return (
          <>
            <h2>Night Time: Doctor Phase</h2>
            <p>Ask the Doctor who they want to save.</p>
            <PlayerSelection
                players={alivePlayers}
                onSelect={handleSelect}
                selected={nightActions.doctorSave}
                mafiaTarget={nightActions.mafiaKill}
                selectionStyle="doctor"
            />
            <button className="btn btn-primary" onClick={nextPhase} disabled={!nightActions.doctorSave}>Confirm Save</button>
          </>
        );
      case 'NIGHT_POLICE':
        const checkedPlayer = players.find(p => p.id === nightActions.policeCheck);
        return (
          <>
            <h2>Night Time: Police Phase</h2>
            <p>Ask the Police who they suspect is the Mafia.</p>
            <PlayerSelection players={alivePlayers} onSelect={handleSelect} selected={nightActions.policeCheck}/>
            {checkedPlayer && <p style={{fontWeight: 'bold'}}>Secretly show the police: {checkedPlayer.name} is {checkedPlayer.role === 'Mafia' ? 'MAFIA' : 'NOT Mafia'}.</p>}
            <button className="btn btn-primary" onClick={nextPhase}>Go to Morning</button>
          </>
        );
      case 'DAY_REVEAL':
        return (
            <>
                <h2>Morning Time</h2>
                <div className={`day-announcement ${announcement.type}`}>
                    {announcement.message}
                </div>
                <button className="btn btn-primary" onClick={nextPhase}>Begin Voting</button>
            </>
        );
      case 'DAY_VOTING':
        return (
            <>
                <h2>Day Time: Voting</h2>
                <p>Discuss and vote to eliminate a player.</p>
                <ul className="voting-list">
                    {alivePlayers.map(p => (
                        <li key={p.id} className="voting-item">
                            <span className="voting-name">{p.name}</span>
                            <div className="vote-controls">
                                <button className="vote-btn" onClick={() => handleVote(p.id, -1)}>−</button>
                                <span className="vote-count">{p.votes}</span>
                                <button className="vote-btn" onClick={() => handleVote(p.id, 1)}>+</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="btn" onClick={resetVotes}>Reset Votes</button>
                <button className="btn btn-danger" onClick={eliminatePlayer}>Eliminate</button>
            </>
        )
      case 'DAY_ELIMINATE':
        return (
            <>
                <h2>Elimination</h2>
                <div className="day-announcement death">{eliminatedPlayer.name} has been eliminated. Their role was: <strong>{eliminatedPlayer.role}</strong>.</div>
                <button className="btn btn-primary" onClick={nextPhase}>Start Next Cycle</button>
            </>
        )
      default:
        return null;
    }
  };

  return <div>{renderPhase()}</div>;
};

export default GameCycle;