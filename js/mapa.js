// Render Map
function renderMap() {
  const map = document.getElementById('world-map');
  if (!map) return;

  map.innerHTML = islands
    .map((island) => {
      const visited = island.visitedBy.length > 0;
      const specialClass = island.type === 'special' || island.type === 'grandline' || island.type === 'newworld' ? 'special' : '';
      const visitedClass = visited ? 'visited' : '';
      return `
        <button class="island-marker ${visitedClass} ${specialClass}" style="left:${island.x}%; top:${island.y}%" onclick="openIslandInfo('${island.id}')">
          <span class="island-dot ${visitedClass} ${specialClass}"></span>
          <span class="island-label">${island.name}</span>
        </button>
      `;
    })
}

// Island Info
function openIslandInfo(islandId) {
  const island = islands.find((item) => item.id === islandId);
  const panel = document.getElementById('island-panel');
  const panelContent = document.getElementById('panel-content');
  if (!island || !panel || !panelContent) return;

  const visitors = island.visitedBy
    .map((visitorId) => characters.find((char) => char.id === visitorId))
    .filter(Boolean)
    .map((char) => char.name);

  const visited = island.visitedBy.length > 0;

  panelContent.innerHTML = `
    <div class="panel-island-name">${island.name}</div>
    <div class="panel-island-region">${island.region}</div>
    <div class="panel-island-desc">${island.desc}</div>
    <div class="panel-visitors">${visited ? `Visitado por ${visitors.join(', ')}` : 'Ninguém visitou ainda'}</div>
    <div class="panel-status ${visited ? 'status-visited' : 'status-not-visited'}">${visited ? 'Visitada' : 'Não Visitada'}</div>
  `;

  panel.classList.add('open');
}
