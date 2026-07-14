const DATA_URL = 'data/games.json';
const STEAMRIP = 'https://steamrip.com';

fetch(DATA_URL)
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('gamesContainer');
    container.innerHTML = data.games.map(g => `
      <div class="game-card" onclick="openModal(${g.id})">
        <img src="${g.cover}" class="game-cover">
        <div class="game-info">
          <h3>${g.title}</h3>
          <p>${g.genre}</p>
        </div>
      </div>
    `).join('');
    
    window.openModal = (id) => {
      const g = data.games.find(x => x.id === id);
      document.getElementById('modalBody').innerHTML = `
        <h2>${g.title}</h2>
        <p>${g.description}</p>
        <a href="${STEAMRIP}" target="_blank" class="source-btn">Descargar en SteamRIP</a>
      `;
      document.getElementById('gameModal').style.display = 'block';
    };
  });

document.querySelector('.close-btn').onclick = () => {
  document.getElementById('gameModal').style.display = 'none';
};
