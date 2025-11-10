import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  open: boolean;
  width?: number;
  height?: number;
  className?: string;
};

export default function DropDown({
  children,
  open,
  width,
  height,
  className,
}: Props) {
  return (
    <div className="relative z-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={open ? { y: 10, opacity: 1 } : { y: 0, opacity: 0 }}
        transition={{ type: 'linear', stiffness: 120 }}
        style={{
          width: width ? `${width || 200}px` : 'auto',
          height: height ? `${height}px` : 'auto',
        }}
        className={`z-100 absolute right-0 flex flex-col overflow-hidden bg-medieval-stone/70 p-2 ${className ?? ''}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
