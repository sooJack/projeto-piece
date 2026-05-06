// Level
function getLevel(xp) {
  const level = Math.floor(Math.sqrt(xp / 150)) + 1;
}

// XP Progress
function getXpProgress(xp) {
  const level = getLevel(xp);
  const previousLevelXp = (level - 1) * (level - 1) * 150;
  const nextLevelXp = level * level * 150;
  const progress = Math.max(0, Math.min(100, Math.round(((xp - previousLevelXp) / (nextLevelXp - previousLevelXp)) * 100)));
}

// Format XP
function formatXp(xp) {
}

// Format Reward
function formatReward(value) {
  return value.toLocaleString('pt-BR');
}
