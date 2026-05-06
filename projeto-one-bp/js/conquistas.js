// Filters
function attachConquistaFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      renderConquistas(button.dataset.filter);
    });
}

// Render
function renderConquistas(filter = 'all') {
  const container = document.getElementById('conquistas-grid');
  if (!container) return;

  const filtered = achievements.filter((item) => {
    const completed = item.completedBy.length > 0;
    if (filter === 'all') return true;
    if (filter === 'disponivel') return !completed && item.type === 'disponivel';
    if (filter === 'completa') return completed;
    if (filter === 'especial') return item.type === 'especial';
    return true;
  });

  container.innerHTML = filtered
    .map((item) => {
      const completed = item.completedBy.length > 0;
      const badgeClass = completed ? 'completa' : '';
      const specialClass = item.type === 'especial' ? 'especial' : '';
      const rewardBadges = [];
      if (item.xp) rewardBadges.push(`<span class="reward-badge reward-xp">+${item.xp} XP</span>`);
      if (item.titleReward) rewardBadges.push(`<span class="reward-badge reward-titulo">${item.titleReward}</span>`);

      return `
        <div class="conquista-card ${badgeClass} ${specialClass}">
          <div class="conquista-top">
            <div class="conquista-icon">${item.icon}</div>
            <div>
              <div class="conquista-title">${item.name}</div>
              <div class="conquista-desc">${item.desc}</div>
            </div>
          </div>
          <div class="conquista-rewards">${rewardBadges.join('')}</div>
          <div class="conquista-completers">${completed ? `Concluída por ${item.completedBy.length} personagem(es)` : 'Disponível para conquistar'}</div>
        </div>
      `;
    })
    .join('');
}
