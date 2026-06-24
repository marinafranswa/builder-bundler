import { useEffect, useState } from "react";
import Builder from "./components/bundleComponents/Builder";
import Checkout from "./components/checkout/Checkout";
import { getProducts } from "./service/getProducts";
import type {
  ProductsByStep,
  SelectedByStep,
  StepKey,
} from "./interface/selection.interfacs";
import { STEP_CONFIG } from "./interface/steps.interface";

const bundleBuilder = "bundleBuilder";

const createEmptySelection = (): SelectedByStep => ({
  cameras: {},
  plan: {},
  sensors: {},
  extraProtection: {},
});

const loadSelectionFromStorage = (): SelectedByStep => {
  try {
    const saved = localStorage.getItem(bundleBuilder);

    if (!saved) return createEmptySelection();

    const parsed = JSON.parse(saved);

    if (parsed && typeof parsed === "object") {
      return {
        ...createEmptySelection(),
        ...parsed,
      };
    }

    return createEmptySelection();
  } catch (error) {
    console.error("Failed to load saved selection:", error);
    return createEmptySelection();
  }
};

export default function App() {
  const [allProducts, setAllProducts] = useState<ProductsByStep>({
    cameras: [],
    plan: [],
    sensors: [],
    extraProtection: [],
  });

  const [selectedByStep, setSelectedByStep] = useState<SelectedByStep>(
    loadSelectionFromStorage,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setAllProducts(response.products);
      } catch (error) {
        console.error("Failed to load products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
const toggleSelect = (
  stepKey: StepKey,
  productId: number,
  variantId: string,
) => {
  setSelectedByStep((prev) => {
    const variants = prev[stepKey][productId] ?? {};
    const currentQty = variants[variantId]?.quantity ?? 0;
    const isSelected = currentQty > 0;

    if (isSelected) {
      // deselect: remove this variant
      const restVariants = { ...variants };
      delete restVariants[variantId];

      if (Object.keys(restVariants).length === 0) {
        const restProducts = { ...prev[stepKey] };
        delete restProducts[productId];
        return { ...prev, [stepKey]: restProducts };
      }

      return {
        ...prev,
        [stepKey]: { ...prev[stepKey], [productId]: restVariants },
      };
    }

    // select: add with qty 1
    return {
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [productId]: { ...variants, [variantId]: { quantity: 1 } },
      },
    };
  });
};

const setQuantity = (
  stepKey: StepKey,
  productId: number,
  variantId: string,
  quantity: number,
) => {
  setSelectedByStep((prev) => {
    const variants = prev[stepKey][productId] ?? {};

    const product = allProducts[stepKey].find((p) => p.id === productId);
    const isRequired = product?.name.includes("(Required)");
    const safeQuantity = isRequired ? Math.max(quantity, 1) : quantity;

    if (safeQuantity <= 0) {
      if (!variants[variantId]) return prev;

      const restVariants = { ...variants };
      delete restVariants[variantId];

      if (Object.keys(restVariants).length === 0) {
        const restProducts = { ...prev[stepKey] };
        delete restProducts[productId];
        return { ...prev, [stepKey]: restProducts };
      }

      return {
        ...prev,
        [stepKey]: { ...prev[stepKey], [productId]: restVariants },
      };
    }

    return {
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [productId]: { ...variants, [variantId]: { quantity: safeQuantity } },
      },
    };
  });
};
  // Save selection
  const saveSelectionToStorage = () => {
    try {
      localStorage.setItem(bundleBuilder, JSON.stringify(selectedByStep));
      return true;
    } catch (error) {
      console.error("Failed to save selection:", error);
      return false;
    }
  };

  const hasProducts = STEP_CONFIG.some(
    (step) => allProducts[step.key]?.length > 0,
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
        <div className="h-8 w-8 rounded-full border-2 border-slate-200 border-t-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !hasProducts) {
    return (
      <div className="flex justify-center py-16 text-slate-500">
        Failed to load security options.
      </div>
    );
  }

  return (
    <main className="mx-auto px-0 md:px-5 lg:px-20 py-12 flex flex-col md:flex-row lg:flex-col gap-4 md:h-fit lg:min-h-dvh">
      <Builder
        allProducts={allProducts}
        selectedByStep={selectedByStep}
        onToggleSelect={toggleSelect}
        onQuantityChange={setQuantity}
      />

      <Checkout
        selectedByStep={selectedByStep}
        allProducts={allProducts}
        onQuantityChange={setQuantity}
        onSave={saveSelectionToStorage}
      />
    </main>
  );
}
