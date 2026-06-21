import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Shield, Webcam } from "lucide-react";
import { Separator } from "../ui/separator";
import ProductCard from "./ProductCard";
import CommonBtn from "./CommonBtn";
import { HiSignal } from "react-icons/hi2";
import { IoIosKeypad } from "react-icons/io";
import { useEffect, useState } from "react";
import { getProducts } from "@/service/getProducts";
import type { Product, ProductsByStep, StepConfig, StepKey } from "@/interface/product.interface";



const STEP_CONFIG: StepConfig[] = [
  {
    key: "cameras",
    value: "camera",
    label: "Choose your cameras",
    icon: <Webcam className="text-slate-500" />,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
  },
  {
    key: "plan",
    value: "plan",
    label: "Choose your Plan",
    icon: <Shield className="text-slate-500" />,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  },
  {
    key: "sensors",
    value: "sensors",
    label: "Choose your sensors",
    icon: <HiSignal className="text-slate-500" />,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  },
  {
    key: "extraProtection",
    value: "protection",
    label: "Add extra protection",
    icon: <IoIosKeypad className="text-slate-500" />,
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  },
];

export default function Builder() {
  const [allProducts, setAllProducts] = useState<ProductsByStep | null>(null);


  const [selectedByStep, setSelectedByStep] = useState<
    Record<StepKey, Set<number>>
  >({
    cameras: new Set(),
    plan: new Set(),
    sensors: new Set(),
    extraProtection: new Set(),
  });

  const toggleSelect = (stepKey: StepKey, id: number) => {
    setSelectedByStep((prev) => {
      const next = new Set(prev[stepKey]);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { ...prev, [stepKey]: next };
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setAllProducts(response.products);
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };
    fetchProducts();
  }, []);
  

  return (
    <Accordion type="single" collapsible >
      {STEP_CONFIG.map((step, index) => {
        const stepProducts: Product[] = allProducts?.[step.key] ?? [];
        const selectedIds = selectedByStep[step.key];

        return (
          <AccordionItem
            key={step.value}
            value={step.value}
            className="group rounded-lg transition-colors data-[state=open]:bg-indigo-50 "
          >
            <AccordionTrigger className="hover:no-underline px-4 py-2 [&>svg]:stroke-indigo-700 ">
              <div className="flex flex-col gap-1.5 flex-1 ">
                <div className="flex justify-between gap-1">
                  <span className="text-slate-500 text-xs">
                    STEP {index + 1} of {STEP_CONFIG.length}
                  </span>
                  <span className="text-indigo-700 text-xs hidden group-data-[state=open]:block">
                    {selectedIds.size} selected
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2 font-semibold text-lg lg:text-xl items-center">
                  {step.icon} {step.label}
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div
                className={`py-2 px-4 grid ${step.gridCols} gap-2 justify-center items-center`}
              >
                {stepProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selected={selectedIds.has(product.id)}
                    onSelect={() => toggleSelect(step.key, product.id)}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-2">
                {STEP_CONFIG[index + 1] ? (
                  <CommonBtn
                    value={step.value}
                    label={`Next: ${STEP_CONFIG[index + 1].label}`}
                    onClick={() => goToNextStep(step.value)}
                  />
                ) : null}
              </div>
            </AccordionContent>
            <Separator />
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
