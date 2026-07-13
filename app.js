// URL del JSON (cambia esto cuando subas a GitHub)
const DATA_URL = 'data/games.json';

let allGames = [];

// Cargar datos
async function loadGames() {
    try {
        const response = await fetch(DATA_URL);
        const data = await response.json();
        allGames = data.games;
        displayGames(allGames);
    } catch (error) {
        console.error('Error cargando juegos:', error);
        document.getElementById('gamesContainer').innerHTML = 
            '<div class="no-results">Error cargando los datos. Verifica la consola.</div>';
    }
}

// Mostrar juegos
function displayGames(games) {
    const container = document.getElementById('gamesContainer');
    
    if (games.length === 0) {
        container.innerHTML = '<div class="no-results">No se encontraron juegos 😔</div>';
        return;
    }
    
    container.innerHTML = games.map(game => `
        <div class="game-card" onclick="openModal(${game.id})">
            <img src="${game.cover}" alt="${game.title}" class="game-cover">
            <div class="game-info">
                <div class="game-title">${game.title}</div>
                <div class="game-meta">
                    <span>${game.genre}</span>
                    <span class="sources-count">${game.sources.length} fuentes</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Abrir modal
function openModal(gameId) {
    const game = allGames.find(g => g.id === gameId);
    if (!game) return;
    
    const modal = document.getElementById('gameModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${game.cover}" alt="${game.title}" class="modal-cover">
            <div class="modal-info">
                <h2>${game.title}</h2>
                <span class="genre-tag">${game.genre}</span>
                <p style="margin-top: 15px;">${game.description}</p>
                <p style="margin-top: 10px;"><strong>Lanzamiento:</strong> ${game.release_date}</p>
            </div>
        </div>
        
        <div class="sources-section">
            <h3>🔗 Fuentes de Descarga (${game.sources.length})</h3>
            ${game.sources.map(source => `
                <div class="source-item">
                    <div class="source-header">
                        <span class="source-name">${source.site}</span>
                        <span class="source-type">${source.type}</span>
                    </div>
                    <div class="source-details">
                        <span>📦 ${source.size}</span>
                        ${source.seeders ? `<span>🌱 ${source.seeders} seeders</span>` : ''}
                    </div>
                    <a href="${source.url}" target="_blank" class="source-btn">
                        Ir a ${source.site} →
                    </a>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.style.display = 'block';
}

// Cerrar modal
document.querySelector('.close-btn').onclick = function() {
    document.getElementById('gameModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Filtrar juegos
function filterGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const genreFilter = document.getElementById('genreFilter').value;
    
    const filtered = allGames.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm);
        const matchesGenre = !genreFilter || game.genre === genreFilter;
        return matchesSearch && matchesGenre;
    });
    
    displayGames(filtered);
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', filterGames);
document.getElementById('genreFilter').addEventListener('change', filterGames);

// Iniciar
loadGames();