import type { Product } from "./product.interface";

export type ProductsByStep = {
  cameras: Product[];
  plan: Product[];
  sensors: Product[];
  extraProtection: Product[];
};


export type StepKey = keyof ProductsByStep;

export const DEFAULT_VARIANT = "default";

export type SelectionMap = Record<number, Record<string, { quantity: number }>>;

export type SelectedByStep = Record<StepKey, SelectionMap>;
