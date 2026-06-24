import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "../ui/separator";
import ProductCard from "./ProductCard";
import CommonBtn from "./CommonBtn";
import { STEP_CONFIG } from "@/interface/steps.interface";
import { useEffect, useState } from "react";
import type {
  ProductsByStep,
  SelectedByStep,
  StepKey,
} from "@/interface/selection.interface";
import { DEFAULT_VARIANT } from "@/interface/selection.interface";

interface BuilderProps {
  allProducts: ProductsByStep;
  selectedByStep: SelectedByStep;
  onToggleSelect: (
    stepKey: StepKey,
    productId: number,
    variantId: string,
  ) => void;
  onQuantityChange: (
    stepKey: StepKey,
    productId: number,
    variantId: string,
    quantity: number,
  ) => void;
}

export default function Builder({
  allProducts,
  selectedByStep,
  onToggleSelect,
  onQuantityChange,
}: BuilderProps) {
  const [openStep, setOpenStep] = useState<string>(STEP_CONFIG[0].value);
  const goToStep = (targetValue: string) => setOpenStep(targetValue);

  useEffect(() => {
    allProducts.sensors.forEach((product) => {
      const isRequired = product.name.includes("(Required)");
      const hasSelection =
        Object.keys(selectedByStep.sensors[product.id] ?? {}).length > 0;

      if (isRequired && !hasSelection) {
        const variantId = product.colors?.[0]?.id ?? DEFAULT_VARIANT;
        onQuantityChange("sensors", product.id, variantId, 1);
      }
    });
  }, [allProducts, selectedByStep, onQuantityChange]);

  return (
    <Accordion
      type="single"
      collapsible
      value={openStep}
      onValueChange={setOpenStep}
    >
      {STEP_CONFIG.map((step, index) => {
        const stepProducts = allProducts[step.key] ?? [];
        const selectedMap = selectedByStep[step.key];
        const selectedCount = Object.keys(selectedMap).length;
        const Icon = step.icon;

        return (
          <AccordionItem
            key={step.key}
            value={step.value}
            className="group rounded-lg transition-colors data-[state=open]:bg-indigo-50"
          >
            <AccordionTrigger className="hover:no-underline px-4 py-2 [&>svg]:stroke-indigo-700">
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex justify-between gap-1">
                  <span className="text-slate-500 text-xs">
                    STEP {index + 1} of {STEP_CONFIG.length}
                  </span>
                  {selectedCount > 0 && (
                    <span className="text-indigo-700 text-xs">
                      {selectedCount} selected
                    </span>
                  )}
                </div>
                <Separator />
                <div className="flex gap-2 font-semibold md:text-xl lg:text-3xl items-center">
                  <Icon className="text-slate-500" />
                  {step.label}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="md:overflow-auto overflow-hidden">
              <div
                className={`py-2 px-4 grid ${step.gridCols} gap-2 justify-center items-center`}
              >
                {stepProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variantSelections={selectedMap[product.id] ?? {}}
                    onSelect={(variantId) =>
                      onToggleSelect(step.key, product.id, variantId)
                    }
                    onQuantityChange={(variantId, qty) =>
                      onQuantityChange(step.key, product.id, variantId, qty)
                    }
                  />
                ))}
              </div>

              <div className="flex justify-center mt-2 gap-2">
                {index < STEP_CONFIG.length - 1 && (
                  <CommonBtn
                    value={STEP_CONFIG[index + 1].value}
                    label={`Next: ${STEP_CONFIG[index + 1].label}`}
                    onClick={() => goToStep(STEP_CONFIG[index + 1].value)}
                  />
                )}
              </div>
            </AccordionContent>
            <Separator />
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
