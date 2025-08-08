type ActionButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export default function ActionButton({
  label,
  isActive,
  onClick,
}: ActionButtonProps) {
  const buttonStyles = `w-full p-1 rounded border-2 bg-black px-2 text-white hover:border-blue-400 ${
    isActive ? 'border-blue-500' : 'border-transparent'
  }`;

  return (
    <button className={buttonStyles} onClick={onClick}>
      {label}
    </button>
  );
}
