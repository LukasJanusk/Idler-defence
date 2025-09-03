import { type Ref, type RefCallback, useEffect, useState } from 'react';

export function useHover<T extends HTMLElement>(): [Ref<T>, boolean] {
  const [hover, setHover] = useState(false);
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;

    const onEnter = () => setHover(true);
    const onLeave = () => setHover(false);

    node.addEventListener('mouseenter', onEnter);
    node.addEventListener('mouseleave', onLeave);

    return () => {
      node.removeEventListener('mouseenter', onEnter);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, [node]);

  const ref: RefCallback<T> = (newNode) => {
    setNode(newNode);
  };

  return [ref, hover];
}
