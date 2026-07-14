const DATA_URL = './data/games.json'; // Ruta relativa explícita

let allGames = [];

// Debug: mostrar que estamos cargando
console.log('Cargando juegos desde:', DATA_URL);

fetch(DATA_URL)
  .then(response => {
    console.log('Respuesta:', response.status, response.statusText);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Datos recibidos:', data);
    allGames = data.games || [];
    console.log('Juegos cargados:', allGames.length);
    renderGames(allGames);
  })
  .catch(err => {
    console.error('Error completo:', err);
    document.getElementById('gamesContainer').innerHTML = `
      <div style="text-align:center;padding:40px;color:#e94560;">
        <h3>Error al cargar los juegos</h3>
        <p>${err.message}</p>
        <p style="font-size:12px;color:#666;margin-top:20px;">
          Verifica que:<br>
          1. La carpeta "data" existe<br>
          2. El archivo "games.json" está dentro<br>
          3. Ambos están subidos a GitHub
        </p>
      </div>
    `;
  });

function renderGames(games) {
  const container = document.getElementById('gamesContainer');
  
  if (games.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:20px;">No hay juegos en la lista</p>';
    return;
  }
  
  container.innerHTML = games.map(g => `
    <div class="game-card" onclick="openModal(${g.id})">
      <img src="${g.cover}" class="game-cover" alt="${g.title}" 
           onerror="this.src='https://via.placeholder.com/220x300?text=No+Image'">
      <div class="game-info">
        <h3>${g.title}</h3>
        <p>${g.genre}</p>
      </div>
    </div>
  `).join('');
}

// Búsqueda
function filterGames() {
  const search = document.getElementById('searchInput').value.toLowerCase().trim();
  const genre = document.getElementById('genreFilter').value;
  
  let filtered = allGames;
  
  if (search) {
    filtered = filtered.filter(g => 
      g.title.toLowerCase().includes(search) ||
      (g.description && g.description.toLowerCase().includes(search))
    );
  }
  
  if (genre) {
    filtered = filtered.filter(g => g.genre === genre);
  }
  
  renderGames(filtered);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('keyup', filterGames);
  document.getElementById('genreFilter').addEventListener('change', filterGames);
});

// Modal
window.openModal = (id) => {
  const g = allGames.find(x => x.id === id);
  if (!g) return;
  
  document.getElementById('modalBody').innerHTML = `
    <h2>${g.title}</h2>
    <p><strong>Género:</strong> ${g.genre}</p>
    <p>${g.description}</p>
    <a href="https://steamrip.com" target="_blank" class="source-btn">Ver en SteamRIP</a>
  `;
  
  document.getElementById('gameModal').style.display = 'block';
};

document.querySelector('.close-btn').onclick = () => {
  document.getElementById('gameModal').style.display = 'none';
};

window.onclick = (e) => {
  if (e.target.id === 'gameModal') {
    document.getElementById('gameModal').style.display = 'none';
  }
};
