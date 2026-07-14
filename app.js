let gamesData = [];

// 1. Cargar los juegos del JSON
async function loadGames() {
    try {
        console.log("Intentando cargar JSON...");
        const response = await fetch('data/games.json');
        
        if (!response.ok) {
            throw new Error("Error al cargar el archivo JSON");
        }

        const data = await response.json();
        gamesData = data.games;
        displayGames(gamesData);
        console.log("Juegos cargados:", gamesData);
    } catch (error) {
        console.error("ERROR CRÍTICO:", error);
        document.getElementById('gamesGrid').innerHTML = `
            <div style="text-align:center; color:red; padding:50px;">
                <h2>Error de formato en games.json</h2>
                <p>Revisa que no falte ninguna coma o llave.</p>
            </div>`;
    }
}

// 2. Pintar los juegos en la pantalla
function displayGames(list) {
    const grid = document.getElementById('gamesGrid');
    grid.innerHTML = ""; // Limpiar antes de pintar

    if (list.length === 0) {
        grid.innerHTML = "<h2>No se encontraron juegos.</h2>";
        return;
    }

    grid.innerHTML = list.map(game => `
        <div class="game-card" onclick="showDetails(${game.id})">
            <img src="${game.cover}" alt="${game.title}" onerror="this.src='https://via.placeholder.com/300x400?text=Error+Imagen'">
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
    if (!game) return;

    const modal = document.getElementById('gameModal');
    const details = document.getElementById('modalDetails');

    // IMPORTANTE: Aquí usamos .links que es lo que saca el generador
    const linksHtml = game.links && game.links.length > 0 
        ? game.links.map(l => `
            <a href="${l.url}" target="_blank" class="buy-btn" style="display: flex; justify-content: space-between; align-items: center; background: #252545; margin-top: 10px; padding: 15px; border-radius: 10px; text-decoration: none; color: white;">
                <span>Comprar en <strong>${l.store}</strong></span>
                <span style="background: #e94560; padding: 5px 10px; border-radius: 5px;">${l.price || 'Ver'}</span>
            </a>
        `).join('')
        : '<p>No hay tiendas disponibles para este juego.</p>';

    details.innerHTML = `
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <img src="${game.cover}" style="width: 200px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.5);">
            <div style="flex: 1; min-width: 250px;">
                <h2 style="margin-top: 0; color: #e94560;">${game.title}</h2>
                <p><strong>Género:</strong> ${game.genre}</p>
                <p style="color: #ccc; line-height: 1.5;">${game.description}</p>
                <h3 style="margin-top: 20px; border-bottom: 1px solid #333; padding-bottom: 10px;">Tiendas disponibles:</h3>
                ${linksHtml}
            </div>
        </div>
    `;

    modal.style.display = "block";
}

// 4. Cerrar Modal
const closeBtn = document.querySelector('.close-btn');
if (closeBtn) {
    closeBtn.onclick = () => {
        document.getElementById('gameModal').style.display = "none";
    }
}

window.onclick = (event) => {
    const modal = document.getElementById('gameModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// 5. Buscador
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = gamesData.filter(g => g.title.toLowerCase().includes(term));
        displayGames(filtered);
    });
}

// Iniciar aplicación
loadGames();
