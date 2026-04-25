"use client";

const PARTICLES = [
  { id: 0,  size: 5, left: 7,  bottom: 15, duration: 18, delay: 0    },
  { id: 1,  size: 4, left: 16, bottom: 60, duration: 22, delay: -4   },
  { id: 2,  size: 7, left: 25, bottom: 30, duration: 15, delay: -8   },
  { id: 3,  size: 4, left: 38, bottom: 50, duration: 20, delay: -12  },
  { id: 4,  size: 6, left: 48, bottom: 20, duration: 25, delay: -2   },
  { id: 5,  size: 5, left: 58, bottom: 70, duration: 17, delay: -16  },
  { id: 6,  size: 8, left: 65, bottom: 10, duration: 21, delay: -6   },
  { id: 7,  size: 4, left: 73, bottom: 45, duration: 19, delay: -10  },
  { id: 8,  size: 6, left: 82, bottom: 25, duration: 23, delay: -14  },
  { id: 9,  size: 5, left: 88, bottom: 65, duration: 16, delay: -3   },
  { id: 10, size: 7, left: 93, bottom: 35, duration: 24, delay: -18  },
  { id: 11, size: 4, left: 12, bottom: 80, duration: 20, delay: -7   },
];

export default function HeroParticles() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            animationName: "particleFloat",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
