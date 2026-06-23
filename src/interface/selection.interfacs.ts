import type { LucideIcon } from "lucide-react";
import type { Product } from "./product.interface";

export type ProductsByStep = {
  cameras: Product[];
  plan: Product[];
  sensors: Product[];
  extraProtection: Product[];
};

export type StepConfig = {
  key: StepKey;
  value: string;
  label: string;
  icon: LucideIcon;
  gridCols: string;
};
export type StepKey = keyof ProductsByStep;

export type SelectionMap = Record<
  number,
  {
    selected: boolean;
    quantity: number;
    color?: string;
  }
>;
export type SelectedByStep = Record<StepKey, SelectionMap>;
