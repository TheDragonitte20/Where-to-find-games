let gamesData = [];

// 1. Cargar los juegos del JSON
async function loadGames() {
    try {
        const response = await fetch('data/games.json');
        const data = await response.json();
        gamesData = data.games;
        displayGames(gamesData);
    } catch (error) {
        console.error("No se pudo cargar el catálogo.");
    }
}

// 2. Pintar los juegos en la pantalla
function displayGames(list) {
    const grid = document.getElementById('gamesGrid');
    grid.innerHTML = list.map(game => `
        <div class="game-card" onclick="showDetails(${game.id})">
            <img src="${game.cover}" alt="${game.title}">
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.genre}</p>
            </div>
        </div>
    `).join('');
}

// 3. Mostrar el modal con los links de compra
function showDetails(id) {
    const game = gamesData.find(g => g.id === id);
    const modal = document.getElementById('gameModal');
    const details = document.getElementById('modalDetails');

    const linksHtml = game.links.map(l => `
        <a href="${l.url}" target="_blank" class="buy-btn">
            <span>Comprar en <strong>${l.store}</strong></span>
            <span>${l.price}</span>
        </a>
    `).join('');

    details.innerHTML = `
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <img src="${game.cover}" style="width: 200px; border-radius: 10px;">
            <div style="flex: 1; min-width: 250px;">
                <h2 style="margin-top: 0;">${game.title}</h2>
                <p><strong>Género:</strong> ${game.genre}</p>
                <p>${game.description}</p>
                <h3 style="margin-top: 20px; color: #e94560;">Tiendas disponibles:</h3>
                ${linksHtml}
            </div>
        </div>
    `;

    modal.style.display = "block";
}

// 4. Cerrar Modal
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('gameModal').style.display = "none";
}

// 5. Buscador
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = gamesData.filter(g => g.title.toLowerCase().includes(term));
    displayGames(filtered);
});

// Iniciar aplicación
loadGames();