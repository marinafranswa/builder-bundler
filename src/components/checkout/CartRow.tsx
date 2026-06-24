import type { Product } from "@/interface/product.interface";
import PlusMinus from "../common/PlusMinus";
import { Shield } from "lucide-react";

interface CartRowProps {
  product: Product;
  variantLabel?: string;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function CartRow({
  product,
  variantLabel,
  quantity,
  onQuantityChange,
}: CartRowProps) {
  const isFree = product.discountPercent === "Free";

  return (
    <div className="flex items-center w-full px-4 py-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="shrink-0 w-6 h-6 md:w-9 md:h-9 rounded-sm md:rounded-lg bg-white flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Shield />
          )}
        </div>
        <span className="lg:text-lg text-xs md:text-sm font-medium text-slate-900 ">
          {product.name}
          {variantLabel && (
            <span className="text-slate-400 font-normal">
              {" "}
              — {variantLabel}
            </span>
          )}
        </span>
      </div>

      <div className="lg:w-30 flex justify-end lg:justify-center">
        <PlusMinus
          quantity={quantity}
          disabled={isFree}
          onIncrease={() => onQuantityChange(quantity + 1)}
          onDecrease={() => onQuantityChange(Math.max(0, quantity - 1))}
        />
      </div>

      <div className="lg:w-25 flex justify-end">
        {product.discountPercent ? (
          <div className="flex lg:flex-row md:flex-col flex-col items-center md:gap-0 lg:gap-2">
            <span className="md:text-sm text-xs lg:text-base text-slate-400 line-through">
              ${(product.originalPrice * quantity).toFixed(2)}
            </span>
            <span className="md:text-sm text-xs lg:text-base font-semibold text-indigo-600">
              {isFree
                ? "FREE"
                : `$${(product.discountPrice! * quantity).toFixed(2)}`}
            </span>
          </div>
        ) : (
          <span className="md:text-sm text-xs lg:text-base font-semibold text-indigo-600">
            ${(product.originalPrice * quantity).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}
