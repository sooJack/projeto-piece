// Render Ranking
function renderRanking() {
  const podiumContainer = document.getElementById('ranking-podium');
  const listContainer = document.getElementById('ranking-list');
  if (!podiumContainer || !listContainer) return;

  const sorted = [...characters].sort((a, b) => b.xp - a.xp);
  const podium = sorted.slice(0, 3);
  const remaining = sorted.slice(3);

  podiumContainer.innerHTML = podium
    .map((character, index) => {
      const place = index + 1;
      return `
        <div class="podium-item podium-place-${place}">
          <div class="podium-avatar">${character.photo ? `<img src="${character.photo}" alt="${character.name}" />` : character.name.charAt(0)}</div>
          <div class="podium-name">${character.name}</div>
          <div class="podium-xp">${formatXp(character.xp)}</div>
          <div class="podium-block">${place}</div>
        </div>
      `;
    })
    .join('');

  listContainer.innerHTML = remaining
    .map((character, index) => {
      const place = index + 4;
      return `
        <div class="ranking-row" onclick="openCharModal('${character.id}')">
          <div class="rank-pos">${place}</div>
          <div class="rank-avatar">${character.photo ? `<img src="${character.photo}" alt="${character.name}" />` : character.name.charAt(0)}</div>
          <div class="rank-info">
            <div class="rank-name">${character.name}</div>
            <div class="rank-title-row">${character.role} · Nível ${getLevel(character.xp)}</div>
          </div>
          <div class="rank-xp">${formatXp(character.xp)}</div>
          <div class="rank-level">${getXpProgress(character.xp)}%</div>
        </div>
      `;
    })
    .join('');
}
