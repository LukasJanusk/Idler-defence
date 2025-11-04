import { useEffect, useState, type RefCallback } from 'react';

export default function useClickOutside<T extends HTMLElement>(
  handle: () => void,
) {
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;

    const handleClick = (e: MouseEvent) => {
      if (!node.contains(e.target as Node)) handle();
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, [handle, node]);

  const ref: RefCallback<T> = (newNode) => {
    setNode(newNode);
  };

  return [ref];
}
