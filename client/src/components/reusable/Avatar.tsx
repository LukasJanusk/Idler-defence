import AvatarOptions from './AvatarOptions';
import { useState } from 'react';
import AvatarIcon from './AvatarIcon';

type Props = {
  clickable?: boolean;
};
export default function Avatar({ clickable = true }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="relative ml-auto">
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
