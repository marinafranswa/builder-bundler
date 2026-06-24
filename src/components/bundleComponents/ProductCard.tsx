import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import type { Product } from "@/interface/product.interface";
import { useState } from "react";
import { Button } from "../ui/button";
import PlusMinus from "../common/PlusMinus";
import { DEFAULT_VARIANT } from "@/interface/selection.interfacs";

type ProductCardProps = {
  product: Product;
  variantSelections: Record<string, { quantity: number }>;
  onSelect: (variantId: string) => void;
  onQuantityChange: (variantId: string, quantity: number) => void;
};

export default function ProductCard({
  product,onSelect,
  variantSelections,
 
  onQuantityChange,
}: ProductCardProps) {
  const defaultVariantId = product.colors?.[0]?.id ?? DEFAULT_VARIANT;
  const [activeVariantId, setActiveVariantId] = useState(defaultVariantId);

const quantity = variantSelections[activeVariantId]?.quantity ?? 0;
const selected = Object.values(variantSelections).some((v) => v.quantity > 0);
  const isFree = product.discountPercent == "Free";

  return (
    <Card
      className={`h-full border-2 cursor-pointer transition-colors text-sm ${
        selected ? "border-indigo-600 bg-indigo-50" : ""
      }`}
    >
      <CardContent className="flex md:items-start lg:items-center flex-col md:justify-around md:flex-row md:flex-wrap lg:flex-col gap-2 md:p-2 lg:p-4 lg:px-2 lg:py-1 h-full">
        <div className="relative flex lg:items-center lg:justify-center h-28 md:w-1/3 lg:w-full shrink-0">
          {product.discountPercent && (
            <Badge className="absolute lg:top-1 lg:left-1 md:left-0.5 md:top-0.5 bg-indigo-600 rounded-full py-1 text-xs">
              {product.discountPercent}
            </Badge>
          )}
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              onClick={() => onSelect(activeVariantId)}
              className="h-24 md:h-18 lg:h-28 object-cover block"
            />
          ) : (
            <Shield size={40} />
          )}
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <h3
            className="text-base lg:text-lg font-semibold leading-tight"
            onClick={() => onSelect(activeVariantId)}
          >
            {product.name}
          </h3>
          <p className="text-xs md:text-xs lg:text-sm text-slate-500 ">
            {product.description}
            <a
              href={product.learnMoreUrl}
              className="text-indigo-600 underline"
            >
              Learn More
            </a>
          </p>
        </div>

        {product.colors && (
          <div className="flex gap-2 lg:flex-wrap mt-2">
            {product.colors.map((colour) => {
              const chipQty = variantSelections[colour.id]?.quantity ?? 0;
              return (
                <Button
                  key={colour.id}
                  variant="outline"
                  onClick={() => {
                    setActiveVariantId(colour.id);
                  }}
                  className={`relative flex items-center gap-1 px-2 py-1 h-8 md:text-[10px] lg:text-xs ${
                    activeVariantId === colour.id
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-slate-200"
                  }`}
                >
                  {colour.image ? (
                    <img
                      src={colour.image}
                      alt={colour.label}
                      className="h-4 w-4 object-contain"
                    />
                  ) : (
                    <span className={`w-2 h-2 rounded-full ${colour.color}`} />
                  )}
                  {colour.label}
                  {chipQty > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[9px] font-medium rounded-full min-w-4 h-4 flex items-center justify-center px-1 leading-none">
                      {chipQty}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between gap- mt-auto">
          <PlusMinus
            quantity={quantity}
            disabled={isFree || !selected}
            onIncrease={() => onQuantityChange(activeVariantId, quantity + 1)}
            onDecrease={() =>
              onQuantityChange(activeVariantId, Math.max(0, quantity - 1))
            }
          />
          {isFree ? (
            <span className="md:text-sm text-xs lg:text-base font-semibold text-indigo-600">
              Free
            </span>
          ) : (
            <div className="flex items-end gap-2 flex-col md:flex-col md:gap-0 md:items-end lg:items-end lg:gap-2 lg:flex-row">
              {product.discountPercent && (
                <span className="text-rose-400 line-through text-base">
                  ${(product.originalPrice * quantity).toFixed(2)}
                </span>
              )}
              <span className="text-sm text-slate-500 font-medium md:text-lg md:font-semibold md:text-slate-700 lg:text-base lg:text-slate-500 lg:font-medium">
                $
                {(product.discountPrice
                  ? product.discountPrice
                  : product.originalPrice * 1
                ).toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
