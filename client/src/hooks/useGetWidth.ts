import { type Ref, type RefCallback, useEffect, useState } from 'react';

export function useGetWidth<T extends HTMLElement>(): [Ref<T>, number] {
  const [maxWidth, setMaxWidth] = useState<number>(0);
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMaxWidth(entry.contentRect.width);
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  const ref: RefCallback<T> = (newNode) => {
    setNode(newNode);
  };

  return [ref, maxWidth];
}
