import { useState } from "react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import CartRow from "./CartRow";
import { STEP_CONFIG } from "@/interface/steps.interface";
import type {
  ProductsByStep,
  SelectedByStep,
  StepKey,
} from "@/interface/selection.interface";
import { getSelectedSections } from "@/service/getSelection";
import ShippingRow from "./ShippingRow";

interface CheckoutProps {
  selectedByStep: SelectedByStep;
  allProducts: ProductsByStep;
  onQuantityChange: (
    stepKey: StepKey,
    productId: number,
    variantId: string,
    quantity: number,
  ) => void;
  onSave: () => boolean;
}

export default function Checkout({
  selectedByStep,
  allProducts,
  onQuantityChange,
  onSave,
}: CheckoutProps) {
  let originalTotal = 0;
  let discountedTotal = 0;
  const sections = getSelectedSections(
    STEP_CONFIG,
    allProducts,
    selectedByStep,
  );

  sections.forEach((section) => {
    section.products.forEach(({ product, quantity }) => {
      const original = product.originalPrice ?? 0;
      const discounted = product.discountPrice ?? original;

      originalTotal += original * quantity;
      discountedTotal += discounted * quantity;
    });
  });
  const totalSavings = originalTotal - discountedTotal;

  const [justSaved, setJustSaved] = useState(false);

  const handleSaveForLater = () => {
    const success = onSave();
    if (success) {
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
    }
  };

  return (
    <>
      <Card className="rounded-md border-0 bg-indigo-50 flex md:flex-col lg:flex-row md:justify-normal lg:justify-between px-2 md:px-4 lg:px-12 md:py-4 lg:py-8 lg:my-8">
        <span className="lg:hidden md:block text-slate-600 font-light uppercase">
          review
        </span>
        <div className="">
          <h4 className="font-semibold text-xl lg:text-3xl">
            Your security system{" "}
          </h4>
          <p className="text-gray-500 text-xs md:text-sm lg:text-base">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>
          <Separator className="my-4" />

          {sections.length === 0 ? (
            <p className="text-slate-400 text-sm py-2">
              Choose products above to build your system.
            </p>
          ) : (
            sections.map((section, i) => (
              <div key={section.key}>
                {i > 0 && <Separator className="my-2" />}
                <h5 className="text-slate-400 text-xs uppercase mb-0.5">
                  {section.value}
                </h5>
                {section.products.map(
                  ({ product, variantId, color, quantity }) => (
                    <CartRow
                      key={`${product.id}-${variantId}`}
                      product={product}
                      variantLabel={color?.label}
                      quantity={quantity}
                      onQuantityChange={(qty) =>
                        onQuantityChange(
                          section.key,
                          product.id,
                          variantId,
                          qty,
                        )
                      }
                    />
                  ),
                )}
              </div>
            ))
          )}
          <ShippingRow />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center  gap-4">
            <div className="w-20 h-20 lg:w-28 lg:h-28 shrink-0">
              <img
                src="/src/assets/images/satisfaction-card.png"
                className="w-full h-full object-contain"
                alt="satisfaction-card"
              />
            </div>

            {/* l*/}
            <div className="hidden lg:flex flex-col gap-2">
              <p className="text-slate-800 font-bold text-2xl">
                30-day hassle-free returns
              </p>
              <p className="text-slate-500 leading-snug text-lg">
                If you're not totally in love with the product, we will refund
                you 100%.
              </p>
            </div>

            {/* md  */}
            <div className="flex lg:hidden flex-1 flex-wrap items-center text-center justify-end gap-3">
              <div className="bg-indigo-700 text-white text-center px-3 py-2 text-xs rounded-sm whitespace-nowrap">
                as low as $19.19/mo
              </div>
              <div className="flex items-center gap-2">
                {totalSavings > 0 && (
                  <span className="text-slate-400 line-through text-lg">
                    ${originalTotal.toFixed(2)}
                  </span>
                )}
                <span className="font-bold text-indigo-600 text-2xl">
                  ${discountedTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* lg only */}
          <div className="hidden lg:flex items-center justify-between py-3">
            <div className="bg-indigo-700 text-white px-3 py-2 text-base rounded-sm">
              as low as $19.19/mo
            </div>
            <div className="flex items-center gap-3">
              {totalSavings > 0 && (
                <span className="text-slate-400 line-through text-2xl">
                  ${originalTotal.toFixed(2)}
                </span>
              )}
              <span className="font-bold text-indigo-600 text-3xl">
                ${discountedTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {totalSavings > 0 && (
            <p className="text-emerald-600 text-xs lg:text-base text-center font-medium">
              Congrats! You're saving ${totalSavings.toFixed(2)} on your
              security bundle!
            </p>
          )}

          <Button className="text-base lg:text-lg font-semibold my-2 bg-indigo-700 w-full text-white rounded-md  py-6 hover:bg-indigo-800 transition-colors">
            Checkout
          </Button>

          <Button
            variant={"link"}
            onClick={handleSaveForLater}
            className="underline text-slate-500 block text-center text-sm"
          >
            {justSaved ? "Saved!" : "Save my system for later"}
          </Button>
        </div>
      </Card>
    </>
  );
}
