import Button from '../reusable/Button';

type Props = {
  onClick: () => void;
};
export default function LevelSelectButton({ onClick: onclick }: Props) {
  return (
    <Button onClick={() => onclick()} className="w-30">
      Start
    </Button>
  );
}
