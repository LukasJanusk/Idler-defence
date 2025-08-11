import { useEffect, useState } from 'react';
import { Animation } from '../animation';
import type { ProjectileAnimation } from '../projectile';

export default function useSpriteLoad(
  current: Animation | ProjectileAnimation | undefined,
) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  useEffect(() => {
    if (!current) return;
    if (current.sheet.img.complete && current.sheet.img.naturalWidth) {
      setSize({
        width: current.sheet.img.naturalWidth / current.nFrame,
        height: current.sheet.img.naturalHeight,
      });
    } else {
      const onLoad = () => {
        setSize({
          width: current.sheet.img.naturalWidth / current.nFrame,
          height: current.sheet.img.naturalHeight,
        });
      };
      current.sheet.img.addEventListener('load', onLoad);
      return () => current.sheet.img.removeEventListener('load', onLoad);
    }
  }, [current]);

  return size;
}
