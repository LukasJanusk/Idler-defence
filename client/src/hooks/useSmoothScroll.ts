import { useEffect, useState, type Ref, type RefCallback } from 'react';

export default function useSmoothScroll<T extends HTMLElement>(
  index: number,
  cardWidth = 256,
  gap = 8,
): [Ref<T>] {
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;
    const scrollPosition =
      index * (cardWidth + gap) - node.clientWidth / 2 + cardWidth / 2;
    node.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, [index, node, cardWidth, gap]);

  const ref: RefCallback<T> = (newNode) => {
    setNode(newNode);
  };

  return [ref];
}
