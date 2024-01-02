import React, { useEffect, useRef, useState } from "react";
import charactersEquipment from "../charactersEquipment.svg";
import clsx from "clsx";
import css from "./Ball.module.css";
import { usePrevValueRef } from "../usePrevValue";

interface BallProps {
  position: [number, number];
  fallPosition: [number, number];
}

export const Ball: React.FC<BallProps> = ({ position, fallPosition }) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const prevPositionRef = usePrevValueRef(position);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentPosition(fallPosition);
    timerRef.current = setTimeout(() => {
      setCurrentPosition(position);
    }, 2400);

    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, [
    setCurrentPosition,
    position[0],
    position[1],
    fallPosition[0],
    fallPosition[1],
  ]);

  return (
    <div
      style={{
        transform: `translate(${currentPosition[0] * 64}px, ${
          currentPosition[1] * 64
        }px)`,
        transition: currentPosition === position ? "100ms" : "2400ms",
        position: "absolute",
        top: 22,
        left: 22,
        width: 19,
        height: 19,
      }}
    >
      <div
        className={clsx(
          css.ball,
          prevPositionRef.current !== currentPosition && css.scale
        )}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: `url(${charactersEquipment})`,
          backgroundSize: "825px 600px",
          backgroundPositionX: `-485px`,
          backgroundPositionY: `-95px`,
          width: 19,
          height: 19,
        }}
      />
    </div>
  );
};
