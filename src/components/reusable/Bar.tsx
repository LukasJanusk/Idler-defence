import { useGetWidth } from '@/hooks/useGetWidth';
type BarProps = {
  value: number;
  maxValue: number;
  showValues?: boolean;
  size?: 'sm' | 'md' | 'lg';
  colorStyles?: string;
  label?: string;
};

const SMALL_HEIGHT = 16;
const MEDIUM_HEIGHT = 24;
const LARGE_HEIGHT = 32;
const LABEL_OFFSET = 12;
const MIN_WIDTH = 64;

export default function Bar({
  value,
  maxValue,
  showValues,
  size,
  colorStyles,
  label,
}: BarProps) {
  // const [maxWidth, setMaxWidth] = useState(0);
  // const maxRef = useRef<HTMLDivElement>(null);
  const [labelRef, labelWidth] = useGetWidth<HTMLDivElement>();
  const [maxRef, maxWidth] = useGetWidth<HTMLDivElement>();

  // useEffect(() => {
  //   if (!maxRef.current) return;
  //   const observer = new ResizeObserver((entries) => {
  //     for (const entry of entries) {
  //       setMaxWidth(entry.contentRect.width);
  //     }
  //   });
  //   observer.observe(maxRef.current);
  //   return () => observer.disconnect();
  // }, []);

  const height =
    size === 'sm' ? SMALL_HEIGHT : size === 'lg' ? LARGE_HEIGHT : MEDIUM_HEIGHT;
  const color = colorStyles?.length ? colorStyles : 'bg-medieval-green-800';
  const displayValue = Math.floor(value > maxValue ? maxValue : value);

  return (
    <div
      ref={maxRef}
      className={`border-box relative flex w-full justify-start border-2 border-medieval-silver bg-medieval-stone shadow-md`}
      style={{
        minWidth: `${MIN_WIDTH}px`,
        height: `${height}px`,
        minHeight: `${height}px`,
        maxHeight: `${height}px`,
      }}
    >
      <div
        style={{
          width: `${Math.round((displayValue / maxValue) * maxWidth)}px`,
          height: `100%`,
        }}
        className={`${color} flex-row`}
      ></div>{' '}
      {showValues && (
        <div
          className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-base' : 'text-lg'} absolute left-1/2 top-1/2 box-border -translate-x-1/2 -translate-y-1/2 font-semibold text-medieval-silver`}
        >{`${displayValue}/${maxValue}`}</div>
      )}
      {label && (
        <div
          ref={labelRef}
          style={{
            left: `-${labelWidth + LABEL_OFFSET}px `,
          }}
          className={`${size === 'lg' ? 'text-lg' : size === 'md' ? 'text-sm' : '-top-0.5 text-xs'} absolute text-nowrap rounded bg-medieval-stoneLight/50 px-1 font-bold text-medieval-dark`}
        >
          {label}
        </div>
      )}
    </div>
  );
}
