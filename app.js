/ Esperamos a que todo el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    
    const DATA_URL = 'data/games.json';
    let allGames = [];
    
    console.log('Iniciando carga...');
    
    // Elementos del DOM
    const container = document.getElementById('gamesContainer');
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    // Cargar juegos
    fetch(DATA_URL)
        .then(response => {
            console.log('Status:', response.status);
            if (!response.ok) {
                throw new Error('Error ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos cargados:', data);
            allGames = data.games || [];
            console.log('Total juegos:', allGames.length);
            renderGames(allGames);
        })
        .catch(error => {
            console.error('Error:', error);
            container.innerHTML = `
                <div style="text-align:center; padding:40px; color:#e94560;">
                    <h3>Error al cargar juegos</h3>
                    <p>${error.message}</p>
                    <p style="font-size:12px; margin-top:10px;">
                        Intenta recargar la página (Ctrl+F5)
                    </p>
                </div>
            `;
        });
    
    // Función para mostrar juegos
    function renderGames(games) {
        if (games.length === 0) {
            container.innerHTML = '<p style="text-align:center; padding:20px;">No hay juegos</p>';
            return;
        }
        
        container.innerHTML = games.map(game => `
            <div class="game-card" onclick="openModal(${game.id})">
                <img src="${game.cover}" class="game-cover" alt="${game.title}">
                <div class="game-info">
                    <h3>${game.title}</h3>
                    <p>${game.genre}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Función de búsqueda
    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedGenre = genreFilter.value;
        
        let filtered = allGames;
        
        if (searchTerm) {
            filtered = filtered.filter(game => 
                game.title.toLowerCase().includes(searchTerm)
            );
        }
        
        if (selectedGenre) {
            filtered = filtered.filter(game => game.genre === selectedGenre);
        }
        
        renderGames(filtered);
    }
    
    // Event listeners
    searchInput.addEventListener('input', filterGames);
    genreFilter.addEventListener('change', filterGames);
    
    // Modal
    window.openModal = function(id) {
        const game = allGames.find(g => g.id === id);
        if (!game) return;
        
        document.getElementById('modalBody').innerHTML = `
            <h2>${game.title}</h2>
            <p><strong>Género:</strong> ${game.genre}</p>
            <p>${game.description}</p>
            <a href="https://steamrip.com" target="_blank" class="source-btn">Descargar</a>
        `;
        document.getElementById('gameModal').style.display = 'block';
    };
    
    // Cerrar modal
    document.querySelector('.close-btn').onclick = function() {
        document.getElementById('gameModal').style.display = 'none';
    };
    
    window.onclick = function(e) {
        const modal = document.getElementById('gameModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
});
