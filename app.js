const DATA_URL = 'data/games.json';
const STEAMRIP = 'https://steamrip.com';

let allGames = []; // Guardamos todos los juegos para filtrar

// Cargar datos
fetch(DATA_URL)
  .then(r => r.json())
  .then(data => {
    allGames = data.games;
    renderGames(allGames);
  })
  .catch(err => {
    console.error('Error cargando juegos:', err);
    document.getElementById('gamesContainer').innerHTML = 
      '<p style="text-align:center;color:#e94560;">Error cargando los juegos</p>';
  });

// Función para renderizar juegos
function renderGames(games) {
  const container = document.getElementById('gamesContainer');
  
  if (games.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>No se encontraron juegos</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = games.map(g => `
    <div class="game-card" onclick="openModal(${g.id})">
      <img src="${g.cover}" class="game-cover" alt="${g.title}">
      <div class="game-info">
        <div class="game-title">${g.title}</div>
        <div class="game-meta">
          <span>${g.genre}</span>
          <span class="sources-count">${g.sources ? g.sources.length : 0} fuentes</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Función de búsqueda
function filterGames() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
  const genreFilter = document.getElementById('genreFilter').value;
  
  let filtered = allGames;
  
  // Filtrar por texto de búsqueda
  if (searchTerm) {
    filtered = filtered.filter(g => 
      g.title.toLowerCase().includes(searchTerm) ||
      g.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filtrar por género
  if (genreFilter) {
    filtered = filtered.filter(g => g.genre === genreFilter);
  }
  
  renderGames(filtered);
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', filterGames);
document.getElementById('genreFilter').addEventListener('change', filterGames);

// Modal
window.openModal = (id) => {
  const g = allGames.find(x => x.id === id);
  if (!g) return;
  
  const sourcesHtml = g.sources ? g.sources.map(s => `
    <div class="source-item">
      <div class="source-header">
        <span class="source-name">${s.site}</span>
        <span class="source-type">${s.type}</span>
      </div>
      <div class="source-details">
        <span>📦 ${s.size}</span>
        ${s.seeders ? `<span>🌱 ${s.seeders} seeders</span>` : ''}
      </div>
      <a href="${s.url}" target="_blank" class="source-btn">Descargar</a>
    </div>
  `).join('') : '<p>No hay fuentes disponibles</p>';
  
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-header">
      <img src="${g.cover}" class="modal-cover" alt="${g.title}">
      <div class="modal-info">
        <h2>${g.title}</h2>
        <span class="genre-tag">${g.genre}</span>
        <p>${g.description}</p>
        <p style="margin-top:10px;color:#a0a0a0;">📅 ${g.release_date}</p>
      </div>
    </div>
    <div class="sources-section">
      <h3>Fuentes de descarga</h3>
      ${sourcesHtml}
    </div>
  `;
  
  document.getElementById('gameModal').style.display = 'block';
};

document.querySelector('.close-btn').onclick = () => {
  document.getElementById('gameModal').style.display = 'none';
};

// Cerrar modal al hacer clic fuera
window.onclick = (e) => {
  const modal = document.getElementById('gameModal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
};
