import { AlertCircle } from 'lucide-react';
import Button from './Button';
import CloseButton from './CloseButton';

type ErrorProps = {
  onClose: () => void;
  message: string;
  label?: string;
  action?: { name: string; handle: () => void };
};

export default function Error({ onClose, message, label, action }: ErrorProps) {
  return (
    <div className="relative flex max-h-[512px] w-[320px] flex-col gap-2 border-4 border-medieval-silver bg-medieval-stone p-4 text-medieval-parchment shadow-xl">
      <div className="flex items-center gap-2 text-xl font-bold">
        <AlertCircle className="rounded-full bg-medieval-stoneCrimson text-medieval-silver" />
        {label ? label : 'Error occured'}
      </div>
      <div className="overflow-auto"> {message}</div>
      {action && <Button onClick={() => action.handle()}>{action.name}</Button>}
      <CloseButton onClose={() => onClose()} />
    </div>
  );
}
