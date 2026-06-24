import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

type PlusMinusProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  disabled?: boolean;
};

export default function PlusMinus({
  quantity,
  onIncrease,
  onDecrease,

  disabled = false,
}: PlusMinusProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        className="lg:h-8 lg:w-8 w-6 h-6 rounded-sm p-0"
        disabled={disabled}
        onClick={() => {
          onDecrease();
        }}
      >
        <Minus className="h-3 w-3" />
      </Button>

      <span className="w-5 text-center lg:text-base md:font-medium tabular-nums">
        {quantity}
      </span>

      <Button
        variant="outline"
        className="lg:h-8 lg:w-8 w-6 h-6 rounded-sm p-0"
        disabled={disabled}
        onClick={() => {
          onIncrease();
        }}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
