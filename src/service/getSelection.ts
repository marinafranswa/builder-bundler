import type {
  ProductsByStep,
  SelectedByStep,
  StepKey,
} from "@/interface/selection.interface";
import { DEFAULT_VARIANT } from "@/interface/selection.interface";
import type { STEP_CONFIG } from "@/interface/steps.interface";

const CHECKOUT_ORDER: StepKey[] = [
  "cameras",
  "sensors",
  "extraProtection",
  "plan",
];

export const getSelectedSections = (
  steps: typeof STEP_CONFIG,
  products: ProductsByStep,
  selected: SelectedByStep,
  order: StepKey[] = CHECKOUT_ORDER,
) => {
  const orderedSteps = [...steps].sort(
    (a, b) => order.indexOf(a.key) - order.indexOf(b.key),
  );

  return orderedSteps
    .map((step) => {
      const rows = (products[step.key] ?? []).flatMap((product) => {
        const variants = selected[step.key][product.id] ?? {};

        return Object.entries(variants).map(([variantId, { quantity }]) => ({
          product,
          variantId,
          color:
            variantId === DEFAULT_VARIANT
              ? undefined
              : product.colors?.find((c) => c.id === variantId),
          quantity,
        }));
      });

      return { ...step, products: rows };
    })
    .filter((section) => section.products.length > 0);
};
