import { useEffect, useState } from "react";

export const StarBackground = ({
  className = "fixed inset-0 overflow-hidden pointer-events-none z-0",
}) => {
  const [stars, setStars] = useState(() => {
    if (typeof window === "undefined") return [];
    const count = Math.min(
      Math.max(Math.floor((window.innerWidth * window.innerHeight) / 7000), 80),
      220
    );
    const newStars = [];
    for (let i = 0; i < count; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2 + 1.2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.6 + 0.4,
        animationDuration: Math.random() * 4 + 2,
        animationDelay: Math.random() * 5,
      });
    }
    return newStars;
  });

  const [meteors] = useState(() => {
    const numberOfMeteors = 6;
    const newMeteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 1.5 + 1.2,
        x: Math.random() * 75 + 20,
        y: Math.random() * 25 - 5,
        delay: -(i * 2.2 + Math.random() * 1),
        animationDuration: Math.random() * 4 + 8, // 8s to 12s for a slow, graceful glide
      });
    }
    return newMeteors;
  });

  useEffect(() => {
    const handleResize = () => {
      const count = Math.min(
        Math.max(
          Math.floor((window.innerWidth * window.innerHeight) / 7000),
          80
        ),
        220
      );
      const newStars = [];
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 2 + 1.2,
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.6 + 0.4,
          animationDuration: Math.random() * 4 + 2,
          animationDelay: Math.random() * 5,
        });
      }
      setStars(newStars);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
            animationDelay: star.animationDelay + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 50 + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay + "s",
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
