import { Button } from "../ui/button";

type CommonBtnProps = {
  value: string;
  label: string;
  onClick: () => void;
};

export default function CommonBtn({ label, onClick }: CommonBtnProps) {
  return (
    <Button
      variant="outline"
      className="border-indigo-600 text-indigo-700"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
