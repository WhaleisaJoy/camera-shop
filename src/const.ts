export const PRODUCT_PAGINATION_STEP = 9;

export const DEFAULT_PAGE = 1;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  CatalogPage = '/catalog/page-',
  Product = '/product-',
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
}

// export enum NameSpace {
//   Data = 'DATA',
// }

export const NameSpace = {
  Data: 'DATA',
} as const;

export enum KeyCode {
  Escape = 'Escape',
}

export enum LoadingStatus {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}

