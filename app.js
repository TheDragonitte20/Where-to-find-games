// Variable global para guardar los juegos
let allGames = [];

// 1. Cargar los datos desde el JSON
async function loadGames() {
    try {
        // Buscamos el archivo en la carpeta data/
        const response = await fetch('data/games.json');
        const data = await response.json();
        allGames = data.games;
        displayGames(allGames);
    } catch (error) {
        console.error("Error cargando los juegos:", error);
        document.getElementById('gamesContainer').innerHTML = "<p>Error al cargar los juegos.</p>";
    }
}

// 2. Función para mostrar los juegos en el grid
function displayGames(games) {
    const container = document.getElementById('gamesContainer');
    
    if (games.length === 0) {
        container.innerHTML = '<div class="no-results">No se encontraron juegos.</div>';
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

// 3. Lógica de búsqueda y filtrado
function filterGames() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedGenre = document.getElementById('genreFilter').value;

    const filtered = allGames.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm);
        const matchesGenre = selectedGenre === "" || game.genre === selectedGenre;
        return matchesSearch && matchesGenre;
    });

    displayGames(filtered);
}

// Event Listeners para búsqueda
document.getElementById('searchInput').addEventListener('input', filterGames);
document.getElementById('genreFilter').addEventListener('change', filterGames);

// 4. Función para abrir el modal (Tu función original mejorada)
window.openModal = function(id) {
    const game = allGames.find(g => g.id === id);
    if (!game) return;
    
    const sourcesHtml = game.sources.map(source => `
        <div class="source-item">
            <div class="source-header">
                <div>
                    <strong class="source-name" style="color: #e94560;">${source.site}</strong>
                    <span class="source-type" style="margin-left: 10px;">${source.type}</span>
                </div>
                <a href="${source.url}" target="_blank" class="source-btn">Descargar</a>
            </div>
            <div class="source-details">
                📦 Tamaño: ${source.size}
            </div>
        </div>
    `).join('');
    
    document.getElementById('modalBody').innerHTML = `
        <div class="modal-header">
            <img src="${game.cover}" class="modal-cover">
            <div class="modal-info">
                <h2>${game.title}</h2>
                <span class="genre-tag">${game.genre}</span>
                <p style="margin-top: 15px;"><strong>Lanzamiento:</strong> ${game.release_date}</p>
                <p>${game.description}</p>
            </div>
        </div>
        
        <div class="sources-section">
            <h3>Fuentes de descarga:</h3>
            ${sourcesHtml || '<p>No hay fuentes disponibles</p>'}
        </div>
    `;
    
    document.getElementById('gameModal').style.display = 'block';
};

// 5. Cerrar el modal
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('gameModal').style.display = 'none';
};

window.onclick = (event) => {
    const modal = document.getElementById('gameModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// Iniciar la carga al abrir la página
loadGames();
