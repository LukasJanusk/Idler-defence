import { useAnimation } from './useAnimation';
import type { SpriteAnimations } from './types';

export type SpriteProps<T extends string> = {
  state: T;
  animations: SpriteAnimations<T>;
  scale: number;
};
export default function Sprite<T extends string>({
  state,
  animations,
  scale = 1,
}: SpriteProps<T>) {
  const frame = useAnimation(animations[state]);
  const width = animations[state].sheet.width / animations[state].nFrame;
  const height = animations[state].sheet.height;

  return (
    <>
      <img
        src={animations[state].sheet.image.src}
        style={{
          border: '1px solid red',
          width: width,
          height: height,
          position: 'absolute',
          objectFit: 'none',
          scale: scale,
          objectPosition: `-${frame * width}px 0`,
        }}
      ></img>
    </>
  );
}
