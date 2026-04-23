import Modal from '@/components/reusable/Modal';
import Settings from '@/components/reusable/Settings';

type Props = {
  onClose: () => void;
};

export default function InGameSettingsModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <Settings title="Settings" onClose={onClose} />
    </Modal>
  );
}
