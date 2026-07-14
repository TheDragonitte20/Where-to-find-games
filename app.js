let gamesData = [];
let currentLang = localStorage.getItem('selectedLang') || 'es';

// Diccionario de la interfaz
const translations = {
    es: { search: "Buscar juego...", genre: "Género", buy: "Comprar en", stores: "Tiendas disponibles", price: "Consultar" },
    en: { search: "Search game...", genre: "Genre", buy: "Buy on", stores: "Available stores", price: "Check price" }
};

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('selectedLang', lang);
    updateUI();
    displayGames(gamesData);
}

function updateUI() {
    const t = translations[currentLang];
    document.getElementById('searchInput').placeholder = t.search;
    // Cambiar estilo de botones activos
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(currentLang));
    });
}

async function loadGames() {
    const response = await fetch('data/games.json');
    const data = await response.json();
    gamesData = data.games;
    updateUI();
    displayGames(gamesData);
}

function displayGames(list) {
    const grid = document.getElementById('gamesGrid');
    grid.innerHTML = list.map(game => `
        <div class="game-card" onclick="showDetails(${game.id})">
            <img src="${game.cover}">
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.genre[currentLang] || game.genre}</p>
            </div>
        </div>
    `).join('');
}

function showDetails(id) {
    const game = gamesData.find(g => g.id === id);
    const t = translations[currentLang];
    
    const linksHtml = game.links.map(l => `
        <a href="${l.url}" target="_blank" class="buy-btn">
            <span>${t.buy} <strong>${l.store}</strong></span>
            <span>${t.price}</span>
        </a>
    `).join('');

    document.getElementById('modalDetails').innerHTML = `
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
            <img src="${game.cover}" style="width: 200px; border-radius: 10px;">
            <div style="flex: 1; min-width: 250px;">
                <h2>${game.title}</h2>
                <p><strong>${t.genre}:</strong> ${game.genre[currentLang] || game.genre}</p>
                <p>${game.description[currentLang] || game.description}</p>
                <h3 style="margin-top: 20px;">${t.stores}:</h3>
                ${linksHtml}
            </div>
        </div>
    `;
    document.getElementById('gameModal').style.display = "block";
}

loadGames();
