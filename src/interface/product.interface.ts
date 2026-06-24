
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
  quantity: number;
  required?: boolean;
};

type Color = { id: string; label: string; image?: string ,color?:string};


