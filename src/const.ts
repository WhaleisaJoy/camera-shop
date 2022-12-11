export const PRODUCT_PAGINATION_STEP = 9;

export const DEFAULT_PAGE = 1;

export const DEFAULT_COUPON_DISCOUNT = 0;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  CatalogPage = '/catalog/page-',
  Product = '/product-',
  Basket = '/basket',
  Warranty = '#',
  Delivery = '#',
  About = '#',
  OperatorСourses = '#',
  Blog = '#',
  Community = '#',
  FAQ = '#',
  AskQuestion = '#',
  NotFound = '/not-found',
}

export enum SocialRoute {
  Vk = '#',
  Pinterest = '#',
  Reddit = '#',
}

export enum APIRoute {
  Cameras = '/cameras',
  Promo = '/promo',
  Similar = '/similar',
  Reviews = '/reviews',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum NameSpace {
  Basket = 'BASKET',
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  Reviews = 'REVIEWS',
  Search = 'SEARCH',
}

export enum KeyCode {
  Escape = 'Escape',
  Enter = 'Enter',
}

export enum LoadingStatus {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}

export enum QueryParams {
  NameLike = 'name_like',
  Sort = '_sort',
  Order = '_order',
  PriceFrom = 'price_gte',
  PriceTo = 'price_lte',
  Category = 'category',
  Type = 'type',
  Level = 'level',
}

export const SortSettings = {
  Type: {
    Price: 'price',
    Rating: 'rating',
  },
  Order: {
    Asc: 'asc',
    Desc: 'desc',
  },
} as const;

export const FilterKeys: string[] = [
  QueryParams.PriceFrom,
  QueryParams.PriceTo,
  QueryParams.Category,
  QueryParams.Type,
  QueryParams.Level
];

export const FilterSettings = {
  Category: {
    Photocamera: 'Фотоаппарат',
    Videocamera: 'Видеокамера',
  },
  Type: {
    Digital: 'Цифровая',
    Film: 'Плёночная',
    Snapshot: 'Моментальная',
    Collection: 'Коллекционная',
  },
  Level: {
    Zero: 'Нулевой',
    NonProfessional: 'Любительский',
    Professional: 'Профессиональный',
  },
} as const;


