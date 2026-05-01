'use client';

import { ReactLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';
import { ReactNode } from 'react';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
