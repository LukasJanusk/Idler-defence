import { useEffect, useState } from 'react';
import { Animation } from '@/model/animations/animation';
import type { ProjectileAnimation } from '@/model/entities/projectile';

export default function useSpriteLoad(
  animation: Animation | ProjectileAnimation | undefined,
) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  useEffect(() => {
    if (!animation) return;
    if (animation.sheet.img.complete && animation.sheet.img.naturalWidth) {
      setSize({
        width: animation.sheet.img.naturalWidth / animation.nFrame,
        height: animation.sheet.img.naturalHeight,
      });
    } else {
      const onLoad = () => {
        setSize({
          width: animation.sheet.img.naturalWidth / animation.nFrame,
          height: animation.sheet.img.naturalHeight,
        });
      };
      animation.sheet.img.addEventListener('load', onLoad);
      return () => animation.sheet.img.removeEventListener('load', onLoad);
    }
  }, [animation]);

  return size;
}
