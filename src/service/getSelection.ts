import type { ProductsByStep, SelectedByStep } from "@/interface/selection.interfacs";
import type { STEP_CONFIG } from "@/interface/steps.interface";

 export const getSelectedSections = (
  steps: typeof STEP_CONFIG,
  products: ProductsByStep,
  selected: SelectedByStep,
) => {
  return steps
    .map((step) => {
      const selectedProducts = (products[step.key] ?? [])
        .filter((product) => selected[step.key][product.id]?.selected)
        .map((product) => ({
          product,
          quantity: selected[step.key][product.id]?.quantity ?? 1,
        }));

      return {
        ...step,
        products: selectedProducts,
      };
    })
    .filter((section) => section.products.length > 0);
};
