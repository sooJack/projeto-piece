// Init Master
function initMaster() {
}

// Master Lists
function renderMasterLists() {
  renderPersonagensMaster();
  renderConquistasMaster();
  renderTitulosMaster();
  renderIlhasMaster();
  populateMasterSelects();
}

function renderPersonagensMaster() {
  const list = document.getElementById('personagens-list-master');
  if (!list) return;

  list.innerHTML = characters
    .map((character) => `
      <div class="master-list-item">
        <div class="item-info">
          <div class="item-name">${character.name}</div>
          <div>${character.role} • ${character.affiliation}</div>
        </div>
        <button class="del-btn" onclick="deleteCharacter('${character.id}')">Excluir</button>
      </div>
}

// Conquistas Master
function renderConquistasMaster() {
  const list = document.getElementById('conquistas-list-master');
  if (!list) return;

  list.innerHTML = achievements
    .map((conquista) => `
      <div class="master-list-item">
        <div class="item-info">
          <div class="item-name">${conquista.name}</div>
          <div>${conquista.type === 'especial' ? 'Especial' : 'Disponível'} • +${conquista.xp} XP</div>
        </div>
        <button class="del-btn" onclick="deleteConquista('${conquista.id}')">Excluir</button>
      </div>
    `)
}

// Titulos Masterfunction renderTitulosMaster() {
  const list = document.getElementById('titulos-list-master');
  if (!list) return;

  list.innerHTML = titles
    .map((titulo) => `
      <div class="master-list-item">
        <div class="item-info">
          <div class="item-name">${titulo.name}</div>
          <div>${titulo.req}</div>
        </div>
        <button class="del-btn" onclick="deleteTitulo('${titulo.id}')">Excluir</button>
      </div>
    `)
    .join('');
}

// Ilhas Master  const list = document.getElementById('ilhas-list-master');
  if (!list) return;

  list.innerHTML = islands
    .map((ilha) => `
      <div class="master-list-item">
        <div class="item-info">
          <div class="item-name">${ilha.name}</div>
          <div>${ilha.region} • ${ilha.type}</div>
        </div>
        <button class="del-btn" onclick="deleteIlha('${ilha.id}')">Excluir</button>
      </div>
    `)
    .join('');
}

function populateMasterSelects() {
  const characterSelects = [
    document.getElementById('cm-personagem'),
    document.getElementById('iv-personagem'),
  ];
  const conquestSelect = document.getElementById('cm-conquista');
  const islandSelect = document.getElementById('iv-ilha');

  characterSelects.forEach((select) => {
    if (!select) return;
    select.innerHTML = `<option value="">Selecione o Personagem</option>` +
      characters
        .map((character) => `<option value="${character.id}">${character.name}</option>`)
        .join('');
  });

  if (conquestSelect) {
    conquestSelect.innerHTML = `<option value="">Selecione a Conquista</option>` +
      achievements
        .map((ach) => `<option value="${ach.id}">${ach.name}</option>`)
        .join('');
  }

  if (islandSelect) {
    islandSelect.innerHTML = `<option value="">Selecione a Ilha</option>` +
      islands
        .map((ilha) => `<option value="${ilha.id}">${ilha.name}</option>`)
        .join('');
  }
}

function addPersonagem() {
  const name = document.getElementById('p-nome')?.value.trim();
  const role = document.getElementById('p-classe')?.value.trim();
  const reward = Number(document.getElementById('p-recompensa')?.value || 0);
  const fruit = document.getElementById('p-fruta')?.value.trim();
  const photo = document.getElementById('p-foto')?.value.trim();
  const affiliation = document.getElementById('p-afiliacao')?.value;

  if (!name || !role || !reward || !affiliation) {
    showToast('Preencha nome, classe, recompensa e afiliação.');
    return;
  }

  characters.push({
    id: `char-${Date.now()}`,
    name,
    role,
    reward,
    fruit,
    affiliation,
    photo,
    xp: 0,
    titles: [],
    achievements: [],
    visitedIslands: [],
  });

  document.getElementById('p-nome').value = '';
  document.getElementById('p-classe').value = '';
  document.getElementById('p-recompensa').value = '';
  document.getElementById('p-fruta').value = '';
  document.getElementById('p-foto').value = '';
  document.getElementById('p-afiliacao').value = 'pirata';

  refreshApp();
  showToast('Personagem adicionado com sucesso.');
}

function addConquista() {
  const name = document.getElementById('c-nome')?.value.trim();
  const desc = document.getElementById('c-desc')?.value.trim();
  const xpValue = Number(document.getElementById('c-xp')?.value || 0);
  const titleReward = document.getElementById('c-titulo')?.value.trim();
  const type = document.getElementById('c-tipo')?.value;
  const icon = document.getElementById('c-icon')?.value.trim() || '🎯';

  if (!name || !desc || !xpValue) {
    showToast('Preencha nome, descrição e XP da conquista.');
    return;
  }

  achievements.push({
    id: `ach-${Date.now()}`,
    name,
    desc,
    xp: xpValue,
    titleReward: titleReward || '',
    type: type || 'disponivel',
    icon,
    completedBy: [],
  });

  document.getElementById('c-nome').value = '';
  document.getElementById('c-desc').value = '';
  document.getElementById('c-xp').value = '';
  document.getElementById('c-titulo').value = '';
  document.getElementById('c-tipo').value = 'disponivel';
  document.getElementById('c-icon').value = '';

  refreshApp();
  showToast('Conquista adicionada com sucesso.');
}

function addTitulo() {
  const name = document.getElementById('t-nome')?.value.trim();
  const desc = document.getElementById('t-desc')?.value.trim();
  const icon = document.getElementById('t-icon')?.value.trim() || '🏅';
  const color = document.getElementById('t-cor')?.value || '#ffffff';
  const req = document.getElementById('t-req')?.value.trim();

  if (!name || !desc || !req) {
    showToast('Preencha nome, descrição e requisito do título.');
    return;
  }

  titles.push({
    id: `title-${Date.now()}`,
    name,
    desc,
    icon,
    color,
    req,
  });

  document.getElementById('t-nome').value = '';
  document.getElementById('t-desc').value = '';
  document.getElementById('t-icon').value = '';
  document.getElementById('t-cor').value = '#ffffff';
  document.getElementById('t-req').value = '';

  refreshApp();
  showToast('Título adicionado com sucesso.');
}

function addIlha() {
  const name = document.getElementById('i-nome')?.value.trim();
  const desc = document.getElementById('i-desc')?.value.trim();
  const region = document.getElementById('i-region')?.value.trim();
  const xValue = Number(document.getElementById('i-x')?.value || 0);
  const yValue = Number(document.getElementById('i-y')?.value || 0);
  const type = document.getElementById('i-tipo')?.value || 'normal';

  if (!name || !desc || !region || Number.isNaN(xValue) || Number.isNaN(yValue)) {
    showToast('Preencha todos os campos da ilha.');
    return;
  }

  islands.push({
    id: `island-${Date.now()}`,
    name,
    desc,
    region,
    x: Math.max(0, Math.min(100, xValue)),
    y: Math.max(0, Math.min(100, yValue)),
    type,
    visitedBy: [],
  });

  document.getElementById('i-nome').value = '';
  document.getElementById('i-desc').value = '';
  document.getElementById('i-region').value = '';
  document.getElementById('i-x').value = '';
  document.getElementById('i-y').value = '';
  document.getElementById('i-tipo').value = 'normal';

  refreshApp();
  showToast('Ilha adicionada com sucesso.');
}

function concluirMissao() {
  const charId = document.getElementById('cm-personagem')?.value;
  const conquestId = document.getElementById('cm-conquista')?.value;
  const feedback = document.getElementById('cm-feedback');

  if (!charId || !conquestId) {
    if (feedback) feedback.textContent = 'Selecione personagem e conquista.';
    return;
  }

  const character = characters.find((item) => item.id === charId);
  const conquest = achievements.find((item) => item.id === conquestId);
  if (!character || !conquest) return;

  if (conquest.completedBy.includes(character.id)) {
    if (feedback) feedback.textContent = 'Esse personagem já concluiu essa conquista.';
    return;
  }

  conquest.completedBy.push(character.id);
  character.achievements.push(conquest.id);
  character.xp += conquest.xp;
  if (conquest.titleReward && !character.titles.includes(conquest.titleReward)) {
    character.titles.push(conquest.titleReward);
  }

  refreshApp();
  if (feedback) {
    feedback.textContent = 'Missão concluída com sucesso!';
    feedback.classList.add('success');
    feedback.classList.remove('error');
  }
}

function marcarIlhaVisitada() {
  const charId = document.getElementById('iv-personagem')?.value;
  const islandId = document.getElementById('iv-ilha')?.value;
  const feedback = document.getElementById('iv-feedback');

  if (!charId || !islandId) {
    if (feedback) feedback.textContent = 'Selecione personagem e ilha.';
    return;
  }

  const character = characters.find((item) => item.id === charId);
  const island = islands.find((item) => item.id === islandId);
  if (!character || !island) return;

  if (character.visitedIslands.includes(island.id)) {
    if (feedback) {
      feedback.textContent = 'Personagem já visitou essa ilha.';
      feedback.classList.add('error');
      feedback.classList.remove('success');
    }
    return;
  }

  character.visitedIslands.push(island.id);
  island.visitedBy.push(character.id);

  refreshApp();
  if (feedback) {
    feedback.textContent = 'Ilha marcada como visitada!';
    feedback.classList.add('success');
    feedback.classList.remove('error');
  }
}

function deleteCharacter(id) {
  const index = characters.findIndex((item) => item.id === id);
  if (index < 0) return;
  characters.splice(index, 1);
  renderMasterLists();
  refreshApp();
  showToast('Personagem removido.');
}

function deleteConquista(id) {
  const index = achievements.findIndex((item) => item.id === id);
  if (index < 0) return;
  achievements.splice(index, 1);
  renderMasterLists();
  refreshApp();
  showToast('Conquista removida.');
}

function deleteTitulo(id) {
  const index = titles.findIndex((item) => item.id === id);
  if (index < 0) return;
  titles.splice(index, 1);
  renderMasterLists();
  refreshApp();
  showToast('Título removido.');
}

function deleteIlha(id) {
  const index = islands.findIndex((item) => item.id === id);
  if (index < 0) return;
  islands.splice(index, 1);
  characters.forEach((character) => {
    character.visitedIslands = character.visitedIslands.filter((islandId) => islandId !== id);
  });
  renderMasterLists();
  refreshApp();
  showToast('Ilha removida.');
}
