import { AlertCircle, X } from 'lucide-react';
import Button from './Button';

type ErrorProps = {
  onClose: () => void;
  message: string;
  label?: string;
  action?: { name: string; handle: () => void };
};

export default function Error({ onClose, message, label, action }: ErrorProps) {
  return (
    <div className="relative flex max-h-[512px] w-[320px] flex-col gap-2 border-4 border-medieval-silver bg-medieval-stone p-4 text-medieval-parchment shadow-xl">
      <div className="flex gap-2 text-xl font-bold">
        <AlertCircle className="rounded-full bg-medieval-stoneCrimson text-medieval-silver" />
        {label ? label : 'Error occured'}
      </div>
      <div className="overflow-auto"> {message}</div>
      {action && <Button onClick={() => action.handle()}>{action.name}</Button>}
      <button
        aria-label="Close modal"
        className="absolute right-2 top-2 rounded-sm bg-medieval-stoneLight/30 text-medieval-stoneCrimson transition-transform duration-200 hover:scale-110 hover:bg-red-300/50 active:scale-95"
        onClick={() => onClose()}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
