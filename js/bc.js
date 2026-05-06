// Variáveis
const loadingScreen = document.getElementById('loading-screen');
const mainContent = document.getElementById('main-content');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.getElementById('nav-toggle');
const navLinksList = document.querySelector('.nav-links');
const toast = document.getElementById('toast');

// Loading
window.addEventListener('load', () => {
  if (loadingScreen) {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 900);
  }
  if (mainContent) {
    mainContent.style.display = 'block';
  }
  attachNavEvents();
});

// Navigation
function attachNavEvents() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const section = link.dataset.section;
      if (!section) return;
      event.preventDefault();
      goTo(section);
      closeMobileNav();
    });
  });

  const openMasterLink = document.getElementById('open-master');
  if (openMasterLink) {
    openMasterLink.addEventListener('click', (event) => {
      event.preventDefault();
      openMaster();
      closeMobileNav();
    });
  }

  attachMasterTabEvents();

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
    });
  }
}

// Mobile Nav
function closeMobileNav() {
  if (navLinksList && navLinksList.classList.contains('open')) {
    navLinksList.classList.remove('open');
  }
}

// Section Navigation
function goTo(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach((section) => {
    section.classList.toggle('active', section.id === sectionId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === sectionId);
  });
}

// Master Tabs
function attachMasterTabEvents() {
  const masterTabs = document.querySelectorAll('.mtab');
  masterTabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      event.preventDefault();
      const tabName = tab.dataset.tab;
      if (!tabName) return;
      setActiveMasterTab(tabName);
    });
  });
}

// Active Tab
function setActiveMasterTab(tabName) {
  const masterTabs = document.querySelectorAll('.mtab');
  const tabContents = document.querySelectorAll('.mtab-content');
  const targetId = `tab-${tabName}`;

  masterTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  tabContents.forEach((content) => {
    content.classList.toggle('hidden', content.id !== targetId);
    if (content.id === targetId) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

// Panels
function closePanel() {
  const panel = document.getElementById('island-panel');
  if (panel) panel.classList.remove('open');
}

// Master Close
function closeMaster() {
  const overlay = document.getElementById('master-overlay');
  if (overlay) overlay.classList.add('hidden');
}

// Char Modal
function closeCharModal() {
  const overlay = document.getElementById('char-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
}

// Master Open
function openMaster() {
  const overlay = document.getElementById('master-overlay');
  const masterPanel = document.getElementById('master-panel');
  const masterLogin = document.getElementById('master-login');
  const panelError = document.getElementById('master-error');
  const passwordField = document.getElementById('master-password');

  if (!overlay || !masterPanel || !masterLogin || !panelError || !passwordField) return;

  overlay.classList.remove('hidden');
  masterPanel.classList.add('hidden');
  masterLogin.classList.remove('hidden');
  panelError.classList.add('hidden');
  passwordField.value = '';
  passwordField.focus();
  setActiveMasterTab('personagens');
}

// Master Login
function loginMaster() {
  const passwordField = document.getElementById('master-password');
  const panelError = document.getElementById('master-error');
  const masterPanel = document.getElementById('master-panel');
  const masterLogin = document.getElementById('master-login');

  if (!passwordField || !panelError || !masterPanel || !masterLogin) return;

  if (passwordField.value.trim() === 'mestre' || passwordField.value.trim() === '1234') {
    panelError.classList.add('hidden');
    masterLogin.classList.add('hidden');
    masterPanel.classList.remove('hidden');
    refreshApp();
    showToast('Acesso liberado!');
  } else {
    panelError.classList.remove('hidden');
  }
}

// App Init
function initApp() {
  renderHeroStats();
  renderWanted();
  renderRanking();
  renderTitles();
  renderConquistas();
  renderMap();
  attachConquistaFilters();
  initMaster();
}

// Hero Stats
function renderHeroStats() {
  const statsContainer = document.getElementById('hero-stats');
  if (!statsContainer) return;

  const totalCharacters = characters.length;
  const totalIslands = islands.length;
  const totalConquistas = achievements.length;
  const averageLevel = Math.round(
    characters.reduce((sum, character) => sum + getLevel(character.xp), 0) / Math.max(1, totalCharacters)
  );

  statsContainer.innerHTML = `
    <div class="stat-badge"><span>${totalCharacters}</span> Personagens</div>
    <div class="stat-badge"><span>${totalIslands}</span> Ilhas</div>
    <div class="stat-badge"><span>${totalConquistas}</span> Conquistas</div>
    <div class="stat-badge"><span>${averageLevel}</span> Nível Médio</div>
  `;
}

// Refresh App
function refreshApp() {
  renderHeroStats();
  renderWanted();
  renderRanking();
  renderTitles();
  renderConquistas();
  renderMap();
  renderMasterLists();
}

// Toast
function showToast(message, duration = 3000) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, duration);
}