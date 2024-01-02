import React, { useEffect, useRef, useState } from "react";
import charactersEquipment from "./charactersEquipment.svg";
import elements from "./elements.svg";
import "./App.css";
import { Character } from "./Character";
import { Floor, floor } from "./Floor";
import { usePrevValueRef } from "./usePrevValue";
import { Ball } from "./Ball/Ball";
import { getRandomInt } from "./getRandomInt";

const net = [47, 28, 28, 28, 28, 28, 48];

const NetTile: React.FC<{ number: number }> = ({ number }) => (
  <div
    onClick={() => {}}
    style={{
      background: `url(${elements})`,
      backgroundSize: "1152px 1152px",
      backgroundPositionX: `-${(number % 9) * 128}px`,
      backgroundPositionY: `-${Math.trunc(number / 9) * 128}px`,
      width: 128,
      height: 128,
    }}
  />
);
const Net: React.FC = () => (
  <div
    style={{
      display: "flex",
      position: "absolute",
      top: (64 * floor.length) / 2,
      left: -32,
      transform: "translate(0, -50%)",
      pointerEvents: "none",
    }}
  >
    {net.map((tileNumber) => (
      <NetTile number={tileNumber || 0} />
    ))}
  </div>
);

const getBallFallPosition = (
  prevBallPosition: [number, number],
  ballPosition: [number, number],
  isMyTurn: boolean
): [number, number] => {
  return [ballPosition[0], ballPosition[1] + (isMyTurn ? 1 : -1)];
  // if (newPosition[0] > prevPosition[0])
  // if (isMyTurn) {
  //   const minY = 12;
  //   return [newPoinsts[0], Math.min(newPoinsts[1], minY)];
  // }
  // const maxY = 10;

  // return [newPoinsts[0], Math.max(maxY, newPoinsts[1])];
};

const App: React.FC = () => {
  const [isStart, setIsStart] = useState(false);
  const [score, setScore] = useState(0);
  const [characterPosition, setCharacterPosition] = useState<[number, number]>([
    3, 0,
  ]);
  const characterPositionRef = useRef(characterPosition);
  characterPositionRef.current = characterPosition;
  const [ballPosition, setBallPositioon] = useState<[number, number]>([
    8,
    floor.length - 1,
  ]);
  const ballPositionRef = useRef(ballPosition);
  ballPositionRef.current = ballPosition;
  const [prevBallPosition, setPrevBallPosition] = useState<[number, number]>([
    0, 0,
  ]);
  const prevPositionRef = usePrevValueRef(ballPosition);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMyTurnRef = useRef(false);

  const ballFallPosition = getBallFallPosition(
    prevPositionRef.current,
    ballPosition,
    isMyTurnRef.current
  );

  useEffect(() => {
    const animation = () => {
      timerRef.current = setTimeout(() => {
        const isMyTurn = isMyTurnRef.current;
        if (
          (characterPositionRef.current[0] !== ballPositionRef.current[0] ||
            characterPositionRef.current[1] !== ballPositionRef.current[1]) &&
          isMyTurn
        ) {
          setCharacterPosition([3, 0]);
          setBallPositioon([8, floor.length - 1]);
          isMyTurnRef.current = false;
          setIsStart(false);
          return;
        }
        isMyTurnRef.current = !isMyTurn;
        setPrevBallPosition(ballPositionRef.current);
        setBallPositioon([
          getRandomInt(2, 10),
          isMyTurn ? getRandomInt(13, 22) : getRandomInt(0, 9),
        ]);
        if (isMyTurn) setScore((state) => state + 1);

        animation();
      }, 2500);
    };

    if (isStart) animation();

    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [isStart]);

  return (
    <div
      style={{ position: "relative", margin: "0 auto" }}
      onDoubleClick={(e) => e.preventDefault()}
    >
      <Floor onClick={setCharacterPosition} />
      <Net />
      <Character position={characterPosition} />
      {isStart && (
        <Ball position={ballPosition} fallPosition={ballFallPosition} />
      )}
      <Character
        enemy
        position={isMyTurnRef.current ? prevBallPosition : ballPosition}
      />
      {!isStart && (
        <div
          style={{
            background: "#00000094",
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#d9cca4",
              width: 600,
              height: 400,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              fontSize: "60px",
              fontWeight: "bold",
              color: "white",
              borderRadius: 6,
              textShadow:
                "rgb(215, 120, 63) 8px 0px 0px, rgb(215, 120, 63) 0px -6px 0px, rgb(215, 120, 63) -8px 2px 0px, rgb(215, 120, 63) 0px 9px 0px",
            }}
          >
            <span>Crazy tennis</span>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  flex: "none",
                  background: `url(${charactersEquipment})`,
                  backgroundSize: "1650px 1200px",
                  backgroundPositionX: `-812px`,
                  backgroundPositionY: `-78px`,
                  width: 100,
                  height: 80,
                  marginRight: 20,
                }}
              />
              <span style={{ fontSize: 40 }}>score: {score}</span>
            </div>
            <button
              onClick={() => {
                setIsStart(true);
                setScore(0);
              }}
              style={{ fontSize: "30px", padding: "10px 20px" }}
            >
              Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
