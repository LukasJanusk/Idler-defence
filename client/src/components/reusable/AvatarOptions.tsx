import { useState } from 'react';
import DropDown from './DropDown';
import Modal from './Modal';
import LoginForm from './LoginForm';
import Button from './Button';
import Alert from './Alert';

type Props = {
  open: boolean;
};
export default function AvatarOptions({ open }: Props) {
  const [signInModal, setSignInModal] = useState(false);
  const [singUpModal, setSignUpModal] = useState(false);
  return (
    <div>
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
          <Alert
            onClose={() => setSignUpModal(false)}
            message="Not yet implemented"
          />
        </Modal>
      )}
    </div>
  );
}
