import { ReactComponent as LargeBorder } from '@/assets/large_border.svg?react';
type ContainerProps = {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
};
export default function Container({ children, size = 'md' }: ContainerProps) {
  const sizeStyles =
    size === 'sm'
      ? 'h-[128px] w-[128px]'
      : size === 'md'
        ? 'h-[256px] w-[256px]'
        : 'h-[256px] w-[512px]';
  return (
    <div className={`${size !== 'lg' && 'border-4 border-medieval-wood'}`}>
      <div
        className={`relative flex ${sizeStyles} flex-col flex-nowrap bg-medieval-stone shadow-lg`}
      >
        {size === 'lg' && (
          <LargeBorder className="absolute left-[-8px] top-[-8px] z-10 h-[272px] w-[528px] text-medieval-parchment" />
        )}
        {children}
      </div>
    </div>
  );
}
