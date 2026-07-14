// Dentro de la función openModal, reemplaza la parte del modal:

window.openModal = function(id) {
    const game = allGames.find(g => g.id === id);
    if (!game) return;
    
    // Generar HTML para todas las fuentes
    const sourcesHtml = game.sources.map(source => `
        <div class="source-item" style="
            background: #2a2a3a;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        ">
            <div>
                <strong style="color: #e94560;">${source.site}</strong>
                <span style="
                    background: #4a4a6a;
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    margin-left: 10px;
                ">${source.type}</span>
                <div style="color: #888; font-size: 14px; margin-top: 5px;">
                    📦 ${source.size}
                </div>
            </div>
            <a href="${source.url}" target="_blank" class="source-btn" style="
                background: #e94560;
                color: white;
                padding: 8px 16px;
                border-radius: 5px;
                text-decoration: none;
            ">Descargar</a>
        </div>
    `).join('');
    
    document.getElementById('modalBody').innerHTML = `
        <h2>${game.title}</h2>
        <p><strong>Género:</strong> ${game.genre}</p>
        <p><strong>Fecha:</strong> ${game.release_date}</p>
        <p>${game.description}</p>
        
        <h3 style="margin-top: 30px; margin-bottom: 15px;">Fuentes de descarga:</h3>
        ${sourcesHtml || '<p>No hay fuentes disponibles</p>'}
    `;
    
    document.getElementById('gameModal').style.display = 'block';
};
