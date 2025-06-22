// components/profile/FavoritesTab.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// Импортируй свой mockProfessionalsData (откуда берутся профи)
import { mockProfessionalsData } from "@/data/professionals";

const FavoritesTab = () => {
  // Получаем ID избранных профи из localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const favoriteProfessionals = mockProfessionalsData.filter(prof => favorites.includes(String(prof.id)));

  if (favoriteProfessionals.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          You haven't added any favorites yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteProfessionals.map(prof => (
        <Card key={prof.id} className="p-4 flex flex-col items-center text-center shadow-md">
          <Avatar className="w-16 h-16 mb-2">
            <AvatarImage src={prof.image} />
            <AvatarFallback>{prof.name?.[0]}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{prof.name}</h3>
          <div className="text-muted-foreground text-sm">{prof.title}</div>
          <div className="flex items-center gap-1 my-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{prof.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-xs mb-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{prof.location}</span>
          </div>
          <Button size="sm" asChild>
            <a href={`/professional/${prof.id}`} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default FavoritesTab;
