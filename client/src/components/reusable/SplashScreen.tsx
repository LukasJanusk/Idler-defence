import { Castle } from 'lucide-react';
import { motion } from 'motion/react';

type Props = {
  splashVisible: boolean;
  setSplashVisible: (visible: boolean) => void;
};
export default function SplashScreen({
  splashVisible,
  setSplashVisible,
}: Props) {
  return (
    <div className="w-wcreen z-1000 flex h-screen flex-grow items-center justify-center bg-medieval-stone">
      <motion.div
        className={`absolute left-0 top-0 h-screen w-screen bg-black/30`}
        animate={{ opacity: splashVisible ? 1 : 0 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        style={{ pointerEvents: splashVisible ? 'auto' : 'none' }}
        onClick={() => setSplashVisible(false)}
      />
      <motion.div
        className="flex h-40 w-40 items-center justify-center rounded-xl bg-medieval-stoneCrimson"
        animate={{
          scale: [1, 2, 2, 1, 1, 1],
          opacity: [0.5, 1, 1, 1, 1, 1],
          y: [0, 0, 0, -110, -110],
        }}
        transition={{
          duration: 5,
          times: [0, 0.15, 0.4, 0.5, 0.55, 1],
          repeat: 0,
        }}
        onAnimationComplete={() => setSplashVisible(false)}
        onClick={() => setSplashVisible(false)}
      >
        <Castle className="h-[80%] w-[80%] text-medieval-parchment" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [1.2, 1] }}
        transition={{ delay: 3, duration: 2, times: [0, 1] }}
        className="absolute pt-5 text-6xl font-bold text-medieval-parchment"
      >
        Idler Defence
      </motion.h1>
    </div>
  );
}
