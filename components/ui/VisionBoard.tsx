"use client";
import { useEffect, useState } from "react";

// Static list — just add filenames when you add new images
const IMAGE_FILES = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
  "6.jpg", "7.jpg", "8.jpg", "9.jpg",
];

export function VisionBoard() {
  const [tiles, setTiles] = useState<Array<{ x: number; y: number; idx: number; imageIdx: number }>>([]);

  useEffect(() => {
    const generateTiles = () => {
      const tileSize = 300;
      const tilesH = Math.ceil(window.innerWidth / tileSize) + 1;
      const tilesV = Math.ceil(window.innerHeight / tileSize) + 1;

      const newTiles: typeof tiles = [];
      for (let row = 0; row < tilesV; row++) {
        for (let col = 0; col < tilesH; col++) {
          newTiles.push({
            x: col * tileSize,
            y: row * tileSize,
            idx: row * tilesH + col,
            imageIdx: (row * tilesH + col) % IMAGE_FILES.length,
          });
        }
      }
      setTiles(newTiles);
    };

    generateTiles();
    window.addEventListener("resize", generateTiles);
    return () => window.removeEventListener("resize", generateTiles);
  }, []);

  if (tiles.length === 0) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1, pointerEvents: "none", overflow: "hidden" }}>
      {tiles.map((tile) => (
        <div
          key={tile.idx}
          className="vision-board-item"
          style={{
            position: "absolute",
            top: `${tile.y}px`,
            left: `${tile.x}px`,
            width: "300px",
            height: "300px",
            backgroundImage: `url('/vision-board/${IMAGE_FILES[tile.imageIdx]}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
