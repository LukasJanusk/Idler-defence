import AvatarOptions from './AvatarOptions';
import { useState } from 'react';
import AvatarIcon from './AvatarIcon';

type Props = {
  clickable?: boolean;
  className?: string;
};
export default function Avatar({ className = '', clickable = true }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div
      className={`relative ml-auto rounded-full border-2 border-medieval-stoneLight/30 ${className && className}`}
    >
      <AvatarIcon
        size="sm"
        onClick={() => {
          if (clickable) setDropdownOpen(true);
        }}
      />
      <AvatarOptions
        open={dropdownOpen}
        setDropdownOpen={(open) => {
          setDropdownOpen(open);
        }}
      />
    </div>
  );
}
