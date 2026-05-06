// Render Titles
function renderTitles() {
  const container = document.getElementById('titles-grid');
  if (!container) return;

  container.innerHTML = titles
    .map((title) => `
      <div class="title-card" style="--title-color: ${title.color}">
        <div class="title-icon">${title.icon}</div>
        <div class="title-name">${title.name}</div>
        <div class="title-desc">${title.desc}</div>
        <div class="title-req">${title.req}</div>
        <div class="title-holders">Título disponível</div>
      </div>
    `)
    .join('');
}
