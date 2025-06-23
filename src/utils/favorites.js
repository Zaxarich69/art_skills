// src/utils/favorites.js

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favorites") || "[]");
  } catch {
    return [];
  }
}

export function addFavorite(id) {
  const favs = getFavorites();
  if (!favs.includes(id)) {
    favs.push(id);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
}

export function removeFavorite(id) {
  const favs = getFavorites().filter(f => f !== id);
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}
