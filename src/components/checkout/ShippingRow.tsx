import { Truck } from "lucide-react";

export default function ShippingRow() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 border-t border-slate-200 mt-2">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
          <Truck className="text-emerald-500" />
        </div>

        <span className="text-sm md:text-lg font-medium text-slate-900">
          Fast Shipping
        </span>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-xs md:text-sm text-slate-400 line-through">
          $5.99
        </span>

        <span className="text-sm md:text-base font-semibold text-indigo-600">
          FREE
        </span>
      </div>
    </div>
  );
}
