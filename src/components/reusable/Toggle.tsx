import { useState } from 'react';

type ToggleProps = {
  on?: boolean;
  defaultOn?: boolean;
  onClick?: (state: boolean) => void;
};

export default function Toggle({
  on: controlledOn,
  defaultOn = false,
  onClick,
}: ToggleProps) {
  const [uncontrolledOn, setUncontrolledOn] = useState(defaultOn);
  const isControlled = controlledOn !== undefined;
  const on = isControlled ? controlledOn : uncontrolledOn;

  const handleClick = () => {
    const newState = !on;
    if (!isControlled) setUncontrolledOn(newState);
    onClick?.(newState);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex h-6 w-12 min-w-12 cursor-pointer items-center rounded-full p-1 transition-colors duration-200 ${
        on ? 'bg-medieval-green-600' : 'bg-medieval-stone'
      }`}
    >
      <div
        className={`h-4 w-4 transform rounded-full bg-medieval-parchment shadow-md transition-transform ${
          on ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </div>
  );
}
