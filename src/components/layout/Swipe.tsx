"use client";

import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import { ArrowLeft, Heart, Star } from "lucide-react";

// Tableau de profils
const profiles = [
  { id: 1, category: "Tech", title: "Titre Tech", description: "Lorem ipsum is a dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout, and is widely accepted in the design and publishing industries" },
  { id: 2, category: "Vie quotidienne", title: "Titre Vie quotidienne", description: "Explication" },
  { id: 3, category: "Société", title: "Titre Société", description: "Explication" },
];

export default function Swipe() {
  // On démarre à l'indice du dernier profil (les cartes sont empilées)
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const currentIndexRef = useRef(currentIndex);

  // Création d'une référence pour chaque carte
  const childRefs = useMemo(
    () => Array(profiles.length).fill(0).map(() => React.createRef<any>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  // Gère le swipe d'une carte
  const swiped = (direction: string, title: string, index: number) => {
    console.log(`Carte "${title}" swipe vers ${direction}`);
    updateCurrentIndex(index - 1);
  };

  // Fonction pour déclencher un swipe programmatique via les boutons
  const swipe = async (dir: "left" | "right" | "up") => {
    if (canSwipe && currentIndex < profiles.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      {/* Zone des cartes */}
      <div className="relative flex w-3/4 h-3/4 items-center justify-center mt-8 ">
        {profiles.map((profile, index) => (
          <TinderCard
            className="absolute"
            key={profile.id}
            ref={childRefs[index]}
            onSwipe={(dir) => swiped(dir, profile.title, index)}
            preventSwipe={["down"]}
          >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-80 h-130 mx-auto flex flex-col">
              <div className="p-4 bg-white">
                <h2 className="text-l font-bold">{profile.category}</h2>
                <p className="text-xl font-bold">{profile.title}</p>
              </div>
              <hr/>
              <div className="p-4 bg-red-100 h-full">
                <span className="text-sm text-gray-500 mt-5">{profile.description}</span>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {/* Boutons d'action placés en dessous */}
      <div className="relative top-10">
        <div className="flex gap-4">
          <button
            onClick={() => swipe("left")}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg"
          >
            <ArrowLeft />
            <span className="sr-only">Swipe gauche</span>
          </button>
          <button
            onClick={() => swipe("up")}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg"
          >
            <Star />
            <span className="sr-only">Super like</span>
          </button>
          <button
            onClick={() => swipe("right")}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg"
          >
            <Heart />
            <span className="sr-only">Swipe droite</span>
          </button>
        </div>
      </div>
    </div>
  );
}