import { X } from 'lucide-react';

type AlertProps = { message: string; onClose: () => void };

export default function Alert({ message, onClose }: AlertProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-[320px] rounded-sm border-2 border-medieval-gold bg-medieval-parchment p-4 shadow-xl">
        <p className="text-center text-lg font-bold text-medieval-dark">
          {message}
        </p>
        <button
          className="absolute right-2 top-2 text-medieval-stoneCrimson transition-transform duration-200 hover:scale-110 active:scale-95"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
