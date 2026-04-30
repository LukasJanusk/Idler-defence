import { useEffect, useState, type Ref, type RefCallback } from 'react';

export function calculateScrollLeft({
  itemOffsetLeft,
  itemWidth,
  containerWidth,
  scrollWidth,
}: {
  itemOffsetLeft: number;
  itemWidth: number;
  containerWidth: number;
  scrollWidth: number;
}) {
  const centeredScrollLeft =
    itemOffsetLeft - containerWidth / 2 + itemWidth / 2;
  const maxScrollLeft = Math.max(scrollWidth - containerWidth, 0);

  return Math.min(Math.max(centeredScrollLeft, 0), maxScrollLeft);
}

export default function useSmoothScroll<T extends HTMLElement>(
  index: number,
): [Ref<T>] {
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;

    const selectedChild = node.children.item(index);

    if (!(selectedChild instanceof HTMLElement)) return;

    const scrollPosition = calculateScrollLeft({
      itemOffsetLeft: selectedChild.offsetLeft,
      itemWidth: selectedChild.offsetWidth,
      containerWidth: node.clientWidth,
      scrollWidth: node.scrollWidth,
    });

    node.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }, [index, node]);

  const ref: RefCallback<T> = (newNode) => {
    setNode(newNode);
  };

  return [ref];
}
