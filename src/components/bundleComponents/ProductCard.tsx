import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Shield } from "lucide-react";
import type { Product } from "@/interface/product.interface";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type ProductCardProps = {
  product: Product;
  selected: boolean;
  onSelect: (id: number) => void;
};

export default function ProductCard({ product, selected,
  onSelect }: ProductCardProps) {
  const [qty, setQty] = useState(1);
    const [color, setColor] = useState("");
    const isFree = product.discountPercent == "Free";
useEffect(() => {
  if (isFree && !selected) {
    onSelect(product.id);
  }
}, [isFree, selected, product.id, onSelect]);
  return (
    <Card
      onClick={() => onSelect(product.id)}
      className={`h-full  border-2 cursor-pointer transition-colors ${
        selected ? "border-indigo-600 bg-indigo-50" : ""
      }`}
    >
      <CardContent className="flex items-center flex-row lg:flex-col gap-2 p-4 lg:px-2 lg:py-1 h-full">
        <div className="relative flex items-center justify-center h-28 md:w-1/3 lg:w-full shrink-0">
          {product.discountPercent && (
            <Badge className="absolute top-1 left-1 bg-indigo-600  rounded-full py-1 text-xs">
              {product.discountPercent}
            </Badge>
          )}

          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-24 md:h-28 object-cover block"
            />
          ) : (
            <Shield size={40} />
          )}
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <h3 className="text-md lg:text-lg font-semibold leading-tight">
            {product.name}
          </h3>

          <p className="mb-0! text-xs md:text-md text-slate-500 leading-snug">
            {product.description}
            <a
              href={product.learnMoreUrl}
              className="text-indigo-600 underline"
            >
              Learn More
            </a>
          </p>

          {product.colors && (
            <div className="flex gap-2 flex-wrap mt-2">
              {product.colors.map((colour) => (
                <Button
                  key={colour.id}
                  variant="outline"
                  onClick={() => setColor(colour.id)}
                  className={`flex items-center gap-1 px-2 py-1 h-8 text-xs ${
                    color === colour.id
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-slate-200"
                  }`}
                >
                  <img
                    src={colour.image}
                    alt={colour.label}
                    className="h-4 w-4 object-contain"
                  />
                  {colour.label}
                </Button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                disabled={isFree}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <span className="w-5 text-center md:font-medium">{qty}</span>

              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                disabled={isFree}
                onClick={() => setQty((q) => q + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-end gap-2 flex-col md:flex-col md:gap-0 md:items-end lg:items-end lg:gap-2 lg:flex-row">
              {product.discountPercent && (
                <span className="text-rose-400 line-through text-sm">
                  ${(product.originalPrice * qty).toFixed(2)}
                </span>
              )}

              <span className="text-sm text-slate-500 font-medium md:text-lg md:font-semibold md:text-slate-700 lg:text-sm lg:text-slate-500 lg:font-medium">
                $
                {product.discountPrice
                  ? (product.discountPrice * qty).toFixed(2)
                  : (product.originalPrice * qty).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
