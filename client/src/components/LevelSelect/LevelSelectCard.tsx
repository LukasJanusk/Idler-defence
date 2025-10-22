import levelDefaultImage from '@/assets/Levels/default_level_image.png';
import { LockIcon } from 'lucide-react';

type Props = {
  level: number;
  selected: number;
  image?: string;
  locked: boolean;
  setSelected: () => void;
};

export default function LevelSelectCard({
  level,
  selected,
  image,
  locked,
  setSelected,
}: Props) {
  const isSelected = level === selected;
  return (
    <div
      onClick={() => setSelected()}
      className={`h-[256px] w-[256px] overflow-hidden p-1 shadow-medieval-dark duration-200 hover:-translate-y-2 hover:shadow-xl ${isSelected ? '-translate-y-2 scale-105 bg-medieval-stoneCrimson' : 'hover:bg-medieval-green-700'}`}
    >
      <div
        className={`relative h-full w-full bg-medieval-dark/90 text-medieval-parchment`}
      >
        <img
          className="h-full w-full object-cover"
          alt={`Background image of level ${level}`}
          src={image || new URL(levelDefaultImage, import.meta.url).href}
        ></img>
        {locked && (
          <div className="absolute left-0 top-0 h-full w-full bg-medieval-dark/80 hover:bg-medieval-dark/10">
            <div className="relative h-full w-full">
              <LockIcon className="absolute left-0 top-0 h-1/2 w-1/2 translate-x-1/2 translate-y-1/2 text-medieval-parchment" />
            </div>
          </div>
        )}
        <div className="absolute bottom-1 right-1 text-2xl font-bold">
          {level === 0 ? 'Tutorial' : `${level}`}
        </div>
      </div>
    </div>
  );
}
