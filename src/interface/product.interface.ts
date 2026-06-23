
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
  quantity:number
};

type Color = { id: string; label: string; image?: string ,color?:string};


