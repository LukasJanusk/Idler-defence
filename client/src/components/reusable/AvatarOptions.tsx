import { useState } from 'react';
import DropDown from './DropDown';
import Modal from './Modal';
import LoginForm from './LoginForm';
import Button from './Button';
import SingupForm from './SignupForm';
import useClickOutside from '@/hooks/useClickOutside';

type Props = {
  open: boolean;
  setDropdownOpen: (open: boolean) => void;
};
export default function AvatarOptions({ open, setDropdownOpen }: Props) {
  const [signInModal, setSignInModal] = useState(false);
  const [singUpModal, setSignUpModal] = useState(false);

  const handleClickOutside = () => {
    setDropdownOpen(false);
  };
  const [ref] = useClickOutside<HTMLDivElement>(handleClickOutside);
  return (
    <div ref={ref}>
      <DropDown
        open={open}
        width={200}
        className="gap-2 border-2 border-medieval-silver p-4 shadow-sm"
      >
        <Button onClick={() => setSignInModal(true)}>Sign In</Button>
        <Button onClick={() => setSignUpModal(true)}>Sign up</Button>
      </DropDown>
      {signInModal && (
        <Modal onClose={() => setSignInModal(false)}>
          <LoginForm
            onSubmit={() => alert('Not yet implemented')}
            onClose={() => setSignInModal(false)}
            open={signInModal}
          />
        </Modal>
      )}
      {singUpModal && (
        <Modal onClose={() => setSignUpModal(false)}>
          <SingupForm
            onSubmit={() => alert('Not yet implemented')}
            onClose={() => setSignUpModal(false)}
            open={signInModal}
          />
        </Modal>
      )}
    </div>
  );
}
