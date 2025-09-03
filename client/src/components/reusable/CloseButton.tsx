import { X } from 'lucide-react';

type CloseButtonProps = {
  onClose?: () => void;
};

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      aria-label="Close modal"
      className="absolute right-2 top-2 rounded-sm bg-medieval-stoneLight/30 text-medieval-stoneCrimson transition-transform duration-200 hover:scale-110 hover:bg-red-300/50 active:scale-95"
      onClick={() => onClose?.()}
    >
      <X className="h-5 w-5" />
    </button>
  );
}
