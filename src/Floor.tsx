import React from "react";
import groundGravel from "./groundGravel.svg";

const TILE_WIDTH = 64;
const TILES_PER_ROW = 12;

interface FloorTileProps {
  onClick(position: [number, number]): void;
  tileNumber: number;
  i: number;
  j: number;
}

const FloorTile: React.FC<FloorTileProps> = ({ tileNumber, onClick, i, j }) => (
  <div
    onClick={() => onClick([j, i])}
    style={{
      flex: "none",
      background: `url(${groundGravel})`,
      backgroundSize: "832px 1024px",
      backgroundPositionX: `-${(tileNumber % TILES_PER_ROW) * TILE_WIDTH}px`,
      backgroundPositionY: `-${
        Math.trunc(tileNumber / TILES_PER_ROW) * TILE_WIDTH
      }px`,
      width: 64,
      height: 64,
    }}
  />
);

export const floor = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 3, 2, 2, 2, 153, 2, 2, 2, 3, 4, 0],
  [0, 13, 15, 0, 0, 0, 0, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 0, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 0, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 0, 0, 0, 0, 15, 16, 0],
  [0, 13, 48, 27, 27, 27, 82, 27, 27, 27, 49, 16, 0],
  [0, 13, 15, 0, 0, 0, 15, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 15, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 15, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 15, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 15, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 15, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 15, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 15, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 15, 0, 0, 0, 15, 16, 0],
  [0, 13, 48, 27, 27, 27, 81, 27, 27, 27, 49, 16, 0],
  [0, 13, 15, 0, 0, 0, 0, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 0, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 0, 0, 0, 0, 15, 16, 0],
  [0, 13, 15, 0, 0, 0, 0, 0, 0, 0, 15, 16, 0],
  [0, 37, 39, 38, 38, 38, 154, 38, 38, 38, 39, 40, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

interface FloorProps {
  onClick: FloorTileProps["onClick"];
}

export const Floor: React.FC<FloorProps> = ({ onClick }) => {
  return (
    <>
      {floor.map((row, i) => (
        <div style={{ display: "flex" }}>
          {row.map((tileNumber, j) => (
            <FloorTile tileNumber={tileNumber} onClick={onClick} i={i} j={j} />
          ))}
        </div>
      ))}
    </>
  );
};
