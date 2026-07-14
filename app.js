// Variable global para guardar los juegos que carguemos
let allGames = [];

// 1. Función para cargar los juegos desde el JSON
async function loadGames() {
    try {
        const response = await fetch('data/games.json');
        if (!response.ok) throw new Error("No se pudo cargar el JSON");
        
        const data = await response.json();
        allGames = data.games; // Guardamos los juegos en la variable global
        
        displayGames(allGames); // Los mostramos en pantalla
    } catch (error) {
        console.error("Error:", error);
    }
}

// 2. Función para mostrar las tarjetas de los juegos
function displayGames(games) {
    const container = document.getElementById('gamesContainer');
    container.innerHTML = ""; // Limpiar contenedor

    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        // AQUÍ ESTÁ EL CLIC:
        card.onclick = () => openModal(game.id); 
        
        card.innerHTML = `
            <img src="${game.cover}" alt="${game.title}" class="game-cover">
            <div class="game-info">
                <div class="game-title">${game.title}</div>
                <div class="game-meta">
                    <span>${game.genre}</span>
                    <span class="sources-count">${game.sources.length} links</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. Función para ABRIR el modal y ver los links de descarga
window.openModal = function(id) {
    const game = allGames.find(g => g.id === id);
    if (!game) return;

    const modal = document.getElementById('gameModal');
    const modalBody = document.getElementById('modalBody');

    // Generar el HTML de los botones de descarga
    const sourcesHtml = game.sources.map(source => `
        <div class="source-item" style="background: #2a2a3a; padding: 15px; margin: 10px 0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong style="color: #e94560;">${source.site}</strong>
                <span style="background: #4a4a6a; padding: 2px 8px; border-radius: 4px; font-size: 12px; margin-left: 10px;">${source.type}</span>
                <div style="color: #888; font-size: 14px; margin-top: 5px;">📦 ${source.size}</div>
            </div>
            <a href="${source.url}" target="_blank" class="source-btn" style="background: #e94560; color: white; padding: 8px 16px; border-radius: 5px; text-decoration: none; font-weight: bold;">Descargar</a>
        </div>
    `).join('');

    // Rellenar el modal con la info del juego
    modalBody.innerHTML = `
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <img src="${game.cover}" style="width: 150px; border-radius: 10px;">
            <div style="flex: 1;">
                <h2 style="margin-bottom: 10px;">${game.title}</h2>
                <p><strong>Género:</strong> ${game.genre}</p>
                <p><strong>Fecha:</strong> ${game.release_date}</p>
                <p style="margin-top: 10px; color: #ccc;">${game.description}</p>
            </div>
        </div>
        <h3 style="margin-top: 30px; margin-bottom: 15px; color: #e94560;">Fuentes de descarga:</h3>
        ${sourcesHtml || '<p>No hay fuentes disponibles</p>'}
    `;

    // Mostrar el modal
    modal.style.display = 'block';
};

// 4. Cerrar el modal al hacer clic en la X
document.querySelector('.close-btn').onclick = function() {
    document.getElementById('gameModal').style.display = 'none';
};

// Cerrar el modal si se hace clic fuera de la caja blanca
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// 5. Buscador (Opcional pero recomendado)
document.getElementById('searchInput').addEventListener('input', (e) => {
    const text = e.target.value.toLowerCase();
    const filtered = allGames.filter(g => g.title.toLowerCase().includes(text));
    displayGames(filtered);
});

// Iniciar la carga
loadGames();
