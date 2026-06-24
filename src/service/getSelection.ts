import type {
  ProductsByStep,
  SelectedByStep,
} from "@/interface/selection.interface";
import { DEFAULT_VARIANT } from "@/interface/selection.interface";
import type { STEP_CONFIG } from "@/interface/steps.interface";

export const getSelectedSections = (
  steps: typeof STEP_CONFIG,
  products: ProductsByStep,
  selected: SelectedByStep,
) => {
  return steps
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
