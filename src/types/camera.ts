export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type CamerasQueryParams = {
  sort?: string | null;
  order?: string | null;
  priceFrom?: string | null;
  priceTo?: string | null;
  category?: string | null;
  type?: string | null;
  level?: string[] | null;
};

export type CamerasPriceRange = {
  minPrice: number;
  maxPrice: number;
};
