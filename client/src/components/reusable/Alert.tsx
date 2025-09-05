import Button from './Button';
import CloseButton from './CloseButton';
import { AlertCircle } from 'lucide-react';

type AlertProps = {
  message: string;
  label?: string;
  onClose: () => void;
  action?: { name: string; handle: () => void };
};

export default function Alert({
  message,
  onClose,
  label = 'Alert',
  action,
}: AlertProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative flex max-h-[512px] w-[320px] flex-col gap-2 border-4 border-medieval-silver bg-medieval-stone p-4 text-medieval-parchment shadow-xl">
        <div className="flex items-center gap-2 text-xl font-bold">
          <AlertCircle className="min-h-6 min-w-6 rounded-full bg-yellow-800 text-medieval-silver" />
          {label}
        </div>
        <p className="overflow-auto text-lg">{message}</p>
        {action && (
          <Button onClick={() => action.handle()}>{action.name}</Button>
        )}
        <CloseButton onClose={() => onClose()} />
      </div>
    </div>
  );
}
