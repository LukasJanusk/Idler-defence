import { X } from 'lucide-react';

type Props = {
  onClose?: () => void;
  className?: string;
};

export default function CloseButton({ onClose, className = '' }: Props) {
  return (
    <button
      aria-label="Close modal"
      className={`absolute right-2 top-2 rounded-sm bg-medieval-stoneLight/30 text-medieval-stoneCrimson transition-transform duration-200 hover:scale-110 hover:bg-red-300/50 active:scale-95 ${className}`}
      onClick={() => onClose?.()}
    >
      <X className="h-5 w-5" />
    </button>
  );
}
