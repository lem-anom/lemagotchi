
import { useState, useRef, useEffect } from 'react';
import petImage from "/public/pet.png";

const Pet = ({petXRef, bounceCount, petRef, isSleeping, isDead, hunger, sleep, boredom}) => {
  const [pos, setPos] = useState(0);
  const [dir, setDir] = useState(1);  //  1 = right, -1 = left
  const dirRef = useRef(1);
  const frameRef = useRef(null);

  const bounceOffSet = bounceCount % 2 === 1 ? -20 : 0;
  useEffect(() => {
    const step = () => {
        
        if (isDead || isSleeping) {
            cancelAnimationFrame(frameRef.current);
            return;
        }
        if (!petRef.current) return;


        //dynamic speed based off of stats
        const baseSpeed = 3;
        const slowFactor = (hunger < 30 || sleep < 30) ? 0.5: 1;
        const fastFactor = (boredom > 70) ? 1.5 : 1;
        const speed = baseSpeed * slowFactor * fastFactor;


        //movement
        const container = petRef.current.parentElement;
        const cw = container.offsetWidth;
        const pw = petRef.current.offsetWidth;

        setPos(prev => {
        let next = prev + dirRef.current * speed; // speed = 3px per frame

        if (next + pw >= cw) {
            next = cw - pw;
            dirRef.current = -1;
            setDir(-1);
        } else if (next <= 0) {
            next = 0;
            dirRef.current = 1;
            setDir(1);
        }
        petXRef.current = next;

        return next;
        });

        frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isDead, hunger, sleep, boredom, isSleeping]);

  // flip = -1 when moving right, 1 when moving left
  const flip = dir === 1 ? 1 : -1;
  const transform = isDead
  ? `translateX(${pos}px) rotate(180deg)` :
  ` translateX(${pos}px) scaleX(${flip}) translateY(${bounceOffSet}px)`;

  return (
    <img
      ref={petRef}
      src={petImage}
      alt="pet"
      className={`absolute
         bottom-4
         w-16
         h-auto
         transform
         transition-transform
         duration-300
         ease-in-out

       ${isDead ? "transition-transform duration-500" :
        "transition-none"}
       `}
       
      style={{
        transform,
        transformOrigin: "center"
      }}
    />
  );
};

export default Pet;
