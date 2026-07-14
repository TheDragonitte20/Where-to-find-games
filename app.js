async function testLoad() {
    console.log("Intentando cargar el JSON...");
    try {
        const response = await fetch('data/games.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - No se encontró el archivo`);
        }

        const data = await response.json();
        console.log("Datos cargados con éxito:", data);
        
        const container = document.getElementById('gamesContainer');
        
        if (data.games && data.games.length > 0) {
            container.innerHTML = data.games.map(game => `
                <div style="border: 1px solid white; padding: 10px; margin: 10px;">
                    <h3>${game.title}</h3>
                    <img src="${game.cover}" width="100">
                </div>
            `).join('');
        } else {
            container.innerHTML = "El JSON está vacío o no tiene el formato correcto.";
        }

    } catch (error) {
        console.error("Error detallado:", error);
        alert("Error al cargar: " + error.message);
    }
}

// Ejecutar la prueba
testLoad();
