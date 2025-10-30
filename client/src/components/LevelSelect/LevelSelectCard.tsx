import levelDefaultImage from '@/assets/Levels/default_level_image.png';
import { LockIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  level: number;
  selected: number;
  icon?: string;
  locked: boolean;
  setSelected: () => void;
};

export default function LevelSelectCard({
  level,
  selected,
  icon,
  locked,
  setSelected,
}: Props) {
  const isSelected = level === selected;
  const [wiggle, setWiggle] = useState(false);
  const [splash, setSplash] = useState(false);

  useEffect(() => {}, []);
  return (
    <div
      onClick={() => {
        if (locked) {
          setWiggle(true);
          setTimeout(() => setWiggle(false), 300);
        }

        setSelected();
      }}
      className={`${splash ? `animate-pulse ${isSelected ? 'bg-medieval-emerald/50' : 'bg-medieval-stoneCrimson/50'}` : ''} group h-[320px] w-[320px] cursor-pointer overflow-hidden p-1 shadow-medieval-dark duration-200 hover:-translate-y-2 hover:shadow-xl ${isSelected ? '-translate-y-2 scale-105 hover:animate-pulse' : ''}`}
    >
      <div
        onClick={() => {
          setSplash(true);
          setTimeout(() => setSplash(false), 300);
        }}
        className={`$ relative h-full w-full bg-medieval-dark/90 text-medieval-parchment`}
      >
        <div
          className={`${splash ? `animate-pulse ${isSelected ? 'bg-medieval-emerald/50' : 'bg-medieval-stoneCrimson/50'}` : ''} absolute left-0 top-0 h-full w-full transition-all duration-300`}
        />
        {locked && (
          <div className="absolute left-0 top-0 h-full w-full bg-medieval-dark/80 hover:bg-medieval-dark/10">
            <div className="relative h-full w-full">
              <LockIcon
                className={`absolute left-0 top-0 h-1/2 w-1/2 translate-x-1/2 translate-y-1/2 text-medieval-parchment duration-300 group-hover:left-4 group-hover:top-4 group-hover:h-8 group-hover:w-8 group-hover:translate-x-0 group-hover:translate-y-0 ${wiggle ? 'animate-wiggle text-medieval-stoneCrimson' : ''}`}
              />
            </div>
          </div>
        )}
        <img
          className="h-full w-full object-cover"
          alt={`image of level ${level}`}
          src={icon || new URL(levelDefaultImage, import.meta.url).href}
        />
        <div className="absolute bottom-1 right-1 text-2xl font-bold">
          {level === 0 ? 'Tutorial' : `${level}`}
        </div>
      </div>
      <div
        className={`h-full w-full blur-sm ${isSelected ? 'bg-medieval-emerald' : 'bg-medieval-stoneCrimson'}`}
      />
    </div>
  );
}
