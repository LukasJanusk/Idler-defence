import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import BACKGROUND_DEFAULT from '@/assets/background/bg_castle.png';

type Props = {
  children: ReactNode;
  width: number;
  height: number;
  source?: string;
  range?: number;
  duration?: number;
};

export default function BackdropAnimation({
  children,
  source,
  width,
  height,
  range = 200,
  duration = 20,
}: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div
        style={{
          zIndex: '0',
          position: 'relative',
          width: `${width + range}px`,
          height: `${height + range}px`,
          transform: `translate(-${range / 2}px, -${range / 2}px)`,
        }}
      >
        <motion.div
          animate={{
            x: [0, range / 3, range / 2, range / 3, 0],
            y: [0, range / 4, range / 2, range / 4, 0],
          }}
          transition={{
            duration,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{
            width: width + range,
            height: height + range,
            position: 'absolute',
            transform: `translate(-${range / 2}px, -${range / 2}px)`,
          }}
        >
          <img
            className="pointer-events-none h-full w-full"
            src={source ?? new URL(BACKGROUND_DEFAULT, import.meta.url).href}
            alt="background animation"
          />
        </motion.div>
        <div
          style={{
            left: range / 2,
            top: range / 2,
            position: 'absolute',
            width,
            height,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
