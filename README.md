# 🎮 GameFinder

Buscador de juegos con múltiples fuentes de descarga.

## 🚀 Cómo usar

1. Clona o descarga este repositorio
2. Abre `index.html` en tu navegador (funciona localmente)
3. O súbelo a GitHub Pages para tenerlo online gratis

## 📝 Agregar más juegos

Edita el archivo `data/games.json` y añade nuevos juegos siguiendo este formato:

```json
{
  "id": 7,
  "title": "Nombre del Juego",
  "genre": "Acción",
  "release_date": "2024-01-15",
  "description": "Descripción del juego...",
  "cover": "https://url-de-la-imagen.jpg",
  "sources": [
    {
      "site": "Nombre del Sitio",
      "url": "https://url-del-sitio.com",
      "type": "Torrent",
      "size": "50 GB",
      "seeders": 1000
    }
  ]
}
