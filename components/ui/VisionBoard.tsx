"use client";

// Static list — just add filenames when you add new images
const IMAGE_FILES = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
  "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
  "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg",
  "16.jpg", "17.jpg", "18.jpg", "19.jpg",
];

// Pre-shuffle enough tiles to cover the largest reasonable viewport (3840×2160 → 20×12 = 240)
const MAX_TILES = 250;
const shuffled: number[] = [];
for (let i = 0; i < MAX_TILES; i++) shuffled.push(i % IMAGE_FILES.length);
let seed = 42;
for (let i = shuffled.length - 1; i > 0; i--) {
  seed = (seed * 16807) % 2147483647;
  const j = seed % (i + 1);
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
}
// Ensure no neighbour in the grid has the same image (use max possible columns for 4K)
const COLS = 20;
for (let i = 0; i < shuffled.length; i++) {
  const neighbours = new Set<number>();
  if (i > 0) neighbours.add(shuffled[i - 1]);                    // left
  if (i >= COLS) neighbours.add(shuffled[i - COLS]);              // above
  if (i >= COLS - 1) neighbours.add(shuffled[i - COLS + 1]);     // above-right
  if (i >= COLS + 1) neighbours.add(shuffled[i - COLS - 1]);     // above-left
  if (neighbours.has(shuffled[i])) {
    for (let j = i + 1; j < shuffled.length; j++) {
      if (!neighbours.has(shuffled[j])) {
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        break;
      }
    }
  }
}

export function VisionBoard() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gridAutoRows: "200px",
        gap: "3px",
      }}
    >
      {shuffled.map((imgIdx, i) => (
        <div
          key={i}
          className="vision-board-item"
            style={{
              backgroundImage: `url('/vision-board/${IMAGE_FILES[imgIdx]}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.85,
            }}
          />
        ))}
    </div>
  );
}
