import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export const Meteors = ({ number = 20, className }) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const generateMeteors = () => {
      return new Array(number).fill(true).map(() => ({
        id: Math.floor(Math.random() * 100000),
        top: Math.floor(Math.random() * 80) + "%", // Random top from 0 to 80%
        left: Math.floor(Math.random() * 100) + "%", // Random left from 0 to 100%
        animationDelay: Math.random() * 1 + 0.2 + "s",
        animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
      }));
    };
    setMeteors(generateMeteors());
  }, [number]);

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "pointer-events-none absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        ></span>
      ))}
    </>
  );
};
