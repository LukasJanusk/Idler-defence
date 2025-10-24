import { motion } from 'motion/react';

type Props = { color?: string };
export default function LoadingCircle({ color }: Props) {
  const draw = {
    hidden: { pathLength: 0, pathOffset: 0, opacity: 1 },
    visible: {
      pathLength: [0, 1, 1, 0],
      pathOffset: [0, 0, 1, 1.001],
      opacity: 1,
      rotate: 360,
      transition: {
        pathLength: {
          duration: 2,
          ease: 'linear',
          times: [0, 0.5, 0.99, 1],
          repeat: Infinity,
          repeatType: 'loop',
        },
        pathOffset: {
          duration: 2,
          ease: 'linear',
          times: [0, 0.5, 0.99, 1],
          repeat: Infinity,
          repeatType: 'loop',
        },
        rotate: {
          duration: 3,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        },
      },
    },
  };

  return (
    <motion.svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      initial="hidden"
      animate="visible"
      style={{
        overflow: 'hidden',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        stroke={color || '#6b7280'}
        variants={draw}
        custom={1}
        style={{
          strokeWidth: 12,
          strokeLinecap: 'round',
          fill: 'transparent',
        }}
      />
    </motion.svg>
  );
}
