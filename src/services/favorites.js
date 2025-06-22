import { toast } from '@/components/ui/use-toast';

// Temporary storage (in a real app, there will be an API)
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

export const favoritesService = {
  getFavorites: () => favorites,
  
  toggleFavorite: (professionalId) => {
    const index = favorites.indexOf(professionalId);
    if (index === -1) {
      favorites.push(professionalId);
      toast({
        title: "Added to favorites",
        description: "Professional has been added to your favorites list",
      });
    } else {
      favorites.splice(index, 1);
      toast({
        title: "Removed from favorites",
        description: "Professional has been removed from your favorites list",
      });
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return index === -1;
  },
  
  isFavorite: (professionalId) => favorites.includes(professionalId)
}; 