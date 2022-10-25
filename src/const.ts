export const PRODUCT_PAGINATION_STEP = 9;

export const DEFAULT_PAGE = 1;

export const SERVER_URL = 'https://camera-shop.accelerator.pages.academy/';

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

export enum NameSpace {
  Data = 'DATA',
}

export enum KeyCode {
  Escape = 'Escape',
}

export enum LoadingStatus {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
}
