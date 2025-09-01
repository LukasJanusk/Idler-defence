import { useGameStore } from '@/store';
import { ArrowRightFromLine } from 'lucide-react';
import { useEffect, useState } from 'react';

type NextWaveButtonProps = {
  onClick?: () => void;
};
export default function NextWaveButton({ onClick }: NextWaveButtonProps) {
  const show = useGameStore((store) => store.showNextWaveButton);
  const setShow = useGameStore((store) => store.setShowNextWave);
  const nextWave = useGameStore((store) => store.nextWave);
  const currentWave = useGameStore((store) => store.currentWave);
  const [pulse, setPulse] = useState<boolean>(true);
  useEffect(() => {
    setPulse(true);
  }, [currentWave, setShow]);
  if (!show) return <></>;
  return (
    <button
      aria-label="Next wave"
      className={`absolute right-8 top-[256px] z-50 flex flex-row items-center gap-2 rounded border-4 border-medieval-parchment bg-medieval-wood p-4 text-2xl font-bold text-medieval-parchment ${!pulse ? 'animate-pop' : 'animate-pulse'}`}
      onClick={() => {
        setPulse(false);
        setTimeout(() => {
          setShow(false);
          onClick?.();
          setTimeout(() => nextWave(), 200);
        }, 500);
      }}
    >
      <span>Next wave </span>
      <ArrowRightFromLine />
    </button>
  );
}
