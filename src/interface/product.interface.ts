export type Product = {
  id: number;
  name: string;
  description: string;
  learnMoreUrl: string;
  image: string;
  originalPrice: number;
  discountPrice?: number;
  discountPercent?: string;
  colors?: Color[];
};

type Color = { id: string; label: string; image: string };

export type ProductsByStep = {
  cameras: Product[];
  plan: Product[];
  sensors: Product[];
  extraProtection: Product[];
};

export type StepConfig = {
  key: StepKey;
  value: string;
  label: string;
  icon: React.ReactNode;
  gridCols: string;
};
export type StepKey = keyof ProductsByStep;
