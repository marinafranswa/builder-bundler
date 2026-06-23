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
} from "@/interface/selection.interfacs";

interface BuilderProps {
  allProducts: ProductsByStep;
  selectedByStep: SelectedByStep;
  onToggleSelect: (stepKey: StepKey, id: number) => void;
  onQuantityChange: (stepKey: StepKey, id: number, quantity: number) => void;
}

export default function Builder({
  allProducts,
  selectedByStep,
  onToggleSelect,
  onQuantityChange,
}: BuilderProps) {
  const [openStep, setOpenStep] = useState<string>(STEP_CONFIG[0].value);

  const goToStep = (targetValue: string) => {
    setOpenStep(targetValue);
  };
useEffect(() => {
  allProducts.sensors.forEach((product) => {
    const isRequired = product.name.includes("(Required)");
    const isSelected = selectedByStep.sensors[product.id]?.selected;

    if (isRequired && !isSelected) {
      onToggleSelect("sensors", product.id);
    }
  });
}, [allProducts, selectedByStep, onToggleSelect]);
  return (
    <>
      <Accordion
        type="single"
        collapsible
        value={openStep}
        onValueChange={setOpenStep}
      >
        {STEP_CONFIG.map((step, index) => {
          const stepProducts = allProducts[step.key] ?? [];
          const selectedMap = selectedByStep[step.key];
          const selectedCount = Object.values(selectedMap).filter(
            (entry) => entry.selected,
          ).length;
          const Icon = step.icon;

          return (
            <AccordionItem
              key={step.value}
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
                      selected={!!selectedMap[product.id]?.selected}
                      onSelect={() => onToggleSelect(step.key, product.id)}
                      quantity={selectedMap[product.id]?.quantity ?? 1}
                      onQuantityChange={(qty) =>
                        onQuantityChange(step.key, product.id, qty)
                      }
                    />
                  ))}
                </div>

                <div className="flex justify-center mt-2 gap-2">
                  {step.key === "cameras" && (
                    <CommonBtn
                      value="sensors"
                      label="Next:Choose your sensors"
                      onClick={() => goToStep("sensors")}
                    />
                  )}
                </div>
              </AccordionContent>

              <Separator />
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
