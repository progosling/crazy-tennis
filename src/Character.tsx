import React, { useEffect, useState } from "react";
import clsx from "clsx";
import charactersEquipment from "./charactersEquipment.svg";
import css from "./Character.module.css";
import { usePrevValueRef } from "./usePrevValue";

interface CharacterProps {
  position: [number, number];
  enemy?: boolean;
}

enum Direction {
  left = "left",
  right = "right",
}

const getDirection = (
  newPosition: [number, number],
  prevPosition: [number, number]
) => {
  // TODO
  if (newPosition[0] > prevPosition[0]) return Direction.right;
  return Direction.left;
};

export const Character: React.FC<CharacterProps> = ({ position, enemy }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const prevPositionRef = usePrevValueRef(position);

  const direction = getDirection(position, prevPositionRef.current);

  useEffect(() => {
    setIsAnimated(true);
    setTimeout(() => {
      setIsAnimated(false);
    }, 1250);
  }, [position]);

  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${position[0] * 64}px, ${position[1] * 64}px)`,
        transition: `900ms`,
        width: 64,
        height: 64,
        left: enemy ? 44 : -44,
        top: enemy ? 44 : -44,
      }}
    >
      <div
        className={clsx(
          css.rotateContainer,
          enemy && css.enemy,
          direction === Direction.left ? css.left : css.right
        )}
      >
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 32,
            width: "32px",
            height: "47px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className={clsx(css.leftLeg, isAnimated && css.move)}
            onClick={() => {}}
            style={{
              // transform: "translate(72%, 42%) rotate(7deg)",
              position: "absolute",
              left: 0,
              top: 0,
              background: `url(${charactersEquipment})`,
              backgroundSize: "825px 600px",
              backgroundPositionX: `-586px`,
              backgroundPositionY: `-262px`,
              width: 29,
              height: 20,
            }}
          />
          <div
            onClick={() => {}}
            className={clsx(css.rightLeg, isAnimated && css.move)}
            style={{
              // transform: "translate(-62%, 108%) rotate(187deg)",
              position: "absolute",
              left: 0,
              top: 0,
              background: `url(${charactersEquipment})`,
              backgroundSize: "825px 600px",
              backgroundPositionX: `-586px`,
              backgroundPositionY: `-262px`,
              width: 29,
              height: 20,
            }}
          />
          <div
            onClick={() => {}}
            style={{
              transform: "translate(82%, 147%) rotate(47deg)",
              transformOrigin: "top left",
              left: 0,
              top: 0,
              position: "absolute",
              background: `url(${charactersEquipment})`,
              backgroundSize: "825px 600px",
              backgroundPositionX: `-586px`,
              backgroundPositionY: `-232px`,
              width: 29,
              height: 20,
            }}
          />
          <div
            onClick={() => {}}
            style={{
              transform: "translate(51%, -120%) rotate(-47deg)",
              transformOrigin: "bottom right",
              left: 0,
              top: 0,
              position: "absolute",
              background: `url(${charactersEquipment})`,
              backgroundSize: "825px 600px",
              backgroundPositionX: `-586px`,
              backgroundPositionY: `-232px`,
              width: 29,
              height: 20,
            }}
          />
          <div
            onClick={() => {}}
            style={{
              transform: "translate(57%, -193%) rotate(-41deg)",
              position: "absolute",
              left: 0,
              top: 0,
              background: `url(${charactersEquipment})`,
              backgroundSize: "825px 600px",
              backgroundPositionX: `-43px`,
              backgroundPositionY: `-142px`,
              width: 44,
              height: 13,
            }}
          />
          <div
            onClick={() => {}}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              background: `url(${charactersEquipment})`,
              backgroundSize: "825px 600px",
              backgroundPositionX: `-45px`,
              backgroundPositionY: `-232px`,
              width: 32,
              height: 47,
            }}
          />
        </div>
      </div>
    </div>
  );
};
