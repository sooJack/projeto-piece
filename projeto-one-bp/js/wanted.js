// Render Wanted
function renderWanted() {
  const container = document.getElementById('wanted-grid');
  if (!container) return;

  container.innerHTML = characters
    .map((character) => {
      const affiliationClass = `afiliacao-${character.affiliation}`;
      const reward = formatReward(character.reward);
      const hasPhoto = Boolean(character.photo);
      return `
        <div class="wanted-card" onclick="openCharModal('${character.id}')">
          <div class="wanted-header">
            <div class="header-line1">PROCURADO</div>
            <div class="header-line2">${character.name}</div>
          </div>
          <div class="wanted-photo">
            ${hasPhoto ? `<img src="${character.photo}" alt="${character.name}" />` : '<div class="no-photo">?</div>'}
            <div class="afiliacao-badge ${affiliationClass}">${character.affiliation.toUpperCase()}</div>
          </div>
          <div class="wanted-body">
            <div class="wanted-name">${character.name}</div>
            <div class="wanted-classe">${character.role}</div>
            <div class="wanted-reward-label">Recompensa</div>
            <div class="wanted-reward">${reward} Berries</div>
            <div class="wanted-fruta">Fruta: ${character.fruit || 'Nenhuma'}</div>
          </div>
        </div>
      `;
    })
}

// Char Modal
function openCharModal(characterId) {
  const character = characters.find((item) => item.id === characterId);
  if (!character) return;

  const overlay = document.getElementById('char-modal-overlay');
  const content = document.getElementById('char-modal-content');
  if (!overlay || !content) return;

  const characterTitles = character.titles.length ? character.titles.join(', ') : 'Nenhum';
  const characterAchievements = achievements
    .filter((item) => item.completedBy.includes(character.id))
    .map((item) => item.name)
    .join(', ') || 'Nenhuma';
  const progress = getXpProgress(character.xp);

  content.innerHTML = `
    <div class="char-modal-header">
      <div class="char-modal-photo">${character.photo ? `<img src="${character.photo}" alt="${character.name}" />` : '☠'}</div>
      <div class="char-detail-name">${character.name}</div>
      <div class="char-detail-level">${character.role} · Nível ${getLevel(character.xp)}</div>
    </div>
    <div class="char-modal-body">
      <div class="xp-bar-wrap"><div class="xp-bar-fill" style="width:${progress}%"></div></div>
      <p><strong>Recompensa:</strong> ${formatReward(character.reward)} Berries</p>
      <p><strong>Fruta do Diabo:</strong> ${character.fruit || 'Nenhuma'}</p>
      <p><strong>Títulos:</strong> ${characterTitles}</p>
      <p><strong>Conquistas:</strong> ${characterAchievements}</p>
      <div class="char-detail-titles">
        ${character.titles.map((title) => `<span class="char-title-badge">${title}</span>`).join('')}
      </div>
      <div class="char-conquistas-list">
        ${achievements
          .filter((item) => item.completedBy.includes(character.id))
          .map((item) => `<div class="char-conquista-item">${item.icon} ${item.name}</div>`)
          .join('')}
      </div>
    </div>
  `;

  overlay.classList.remove('hidden');
}
