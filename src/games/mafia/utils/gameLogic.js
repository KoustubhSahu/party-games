export const assignRoles = (players) => {
  const numPlayers = players.length;
  const numMafia = Math.floor(numPlayers * 0.3);
  
  let roles = ['Doctor', 'Police'];
  for (let i = 0; i < numMafia; i++) {
    roles.push('Mafia');
  }
  while (roles.length < numPlayers) {
    roles.push('Villager');
  }

  // Shuffle roles
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }
  
  return players.map((player, index) => ({ ...player, role: roles[index] }));
};

export const checkWinConditions = (players) => {
  const alivePlayers = players.filter(p => p.isAlive);
  const aliveMafia = alivePlayers.filter(p => p.role === 'Mafia');
  const aliveTown = alivePlayers.filter(p => p.role !== 'Mafia');

  if (aliveMafia.length === 0) {
    return 'VILLAGERS_WIN';
  }
  if (aliveMafia.length >= aliveTown.length) {
    return 'MAFIA_WINS';
  }
  return null; // No winner yet
};