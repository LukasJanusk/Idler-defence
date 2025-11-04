import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import useClickOutside from '@/hooks/useClickOutside';

type Props = {
  children: ReactNode;
  onClose: () => void;
  duration?: number;
};

export default function Modal({ children, onClose, duration = 2 }: Props) {
  const [visible, setVisible] = useState(true);
  const handleClickOutside = () => {
    setVisible(false);
    setTimeout(() => onClose(), duration);
  };

  const [ref] = useClickOutside<HTMLDivElement>(handleClickOutside);

  return (
    <div className="fixed inset-0 z-50 flex h-screen max-h-none w-screen max-w-none items-center justify-center">
      <motion.div
        className={`absolute left-0 top-0 h-screen w-screen bg-black/50`}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration, ease: 'easeInOut' }}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
        onClick={() => {
          setVisible(false);
          setTimeout(() => onClose(), duration);
        }}
      />
      <div ref={ref} className="z-1000 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
