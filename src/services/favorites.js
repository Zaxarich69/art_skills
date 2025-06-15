import { toast } from '@/components/ui/use-toast';

// Временное хранилище (в реальном приложении будет API)
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

export const favoritesService = {
  getFavorites: () => favorites,
  
  toggleFavorite: (professionalId) => {
    const index = favorites.indexOf(professionalId);
    if (index === -1) {
      favorites.push(professionalId);
      toast({
        title: "Добавлено в избранное",
        description: "Профессионал добавлен в ваш список избранного",
      });
    } else {
      favorites.splice(index, 1);
      toast({
        title: "Удалено из избранного",
        description: "Профессионал удален из вашего списка избранного",
      });
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return index === -1;
  },
  
  isFavorite: (professionalId) => favorites.includes(professionalId)
}; 