// src/pages/FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import { mockProfessionalsData } from "@/data/professionals"; // свой путь к данным
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FavoritesTab = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favPros = mockProfessionalsData.filter(p => favIds.includes(String(p.id)));
    setFavorites(favPros);
  }, []);

  if (favorites.length === 0) {
    return <div className="p-10 text-center text-lg text-muted-foreground">No favorites yet.</div>;
  }

  return (
    <div className="container pt-20 pb-10">
      <h2 className="text-2xl font-bold mb-8">Your Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map(pro => (
          <Card key={pro.id}>
            <CardContent className="p-4 flex items-center gap-6">
              <img src={pro.image} alt={pro.name} className="w-16 h-16 rounded-full" />
              <div className="flex-1">
                <div className="font-bold">{pro.name}</div>
                <div className="text-sm text-muted-foreground">{pro.title}</div>
                <Button asChild size="sm" className="mt-2">
                  <Link to={`/professional/${pro.id}`}>View Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavoritesTab;
