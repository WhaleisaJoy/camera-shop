import { AppRoute, SocialRoute } from './const';

export const RatingSettings = [
  {
    Name: 'terrible',
    Value: 1,
  },
  {
    Name: 'bad',
    Value: 2,
  },
  {
    Name: 'not bad',
    Value: 3,
  },
  {
    Name: 'good',
    Value: 4,
  },
  {
    Name: 'perfect',
    Value: 5,
  },
] as const;

export const MainNavSettings = [
  {
    Name: 'Каталог',
    Url: AppRoute.Catalog,
  },
  {
    Name: 'Гарантии',
    Url: AppRoute.Warranty,
  },
  {
    Name: 'Доставка',
    Url: AppRoute.Delivery,
  },
  {
    Name: 'О компании',
    Url: AppRoute.About,
  },
] as const;

export const FooterNavSettings = [
  {
    Name: 'Навигация',
    Content: [
      {
        Name: 'Каталог',
        Url: AppRoute.Catalog,
      },
      {
        Name: 'Гарантии',
        Url: AppRoute.Warranty,
      },
      {
        Name: 'Доставка',
        Url: AppRoute.Delivery,
      },
      {
        Name: 'О компании',
        Url: AppRoute.About,
      },
    ],
  },
  {
    Name: 'Ресурсы',
    Content: [
      {
        Name: 'Курсы операторов',
        Url: AppRoute.OperatorСourses,
      },
      {
        Name: 'Блог',
        Url: AppRoute.Blog,
      },
      {
        Name: 'Сообщество',
        Url: AppRoute.Community,
      },
    ],
  },
  {
    Name: 'Поддержка',
    Content: [
      {
        Name: 'FAQ',
        Url: AppRoute.FAQ,
      },
      {
        Name: 'Задать вопрос',
        Url: AppRoute.AskQuestion,
      },
    ],
  },
];

export const SocialSettings = [
  {
    Name: 'Vk',
    Label: 'Переход на страницу вконтатке',
    Url: SocialRoute.Vk,
    Icon: '#icon-vk',
    IconWidth: 20,
    IconHeight: 20,
  },
  {
    Name: 'Pinterest',
    Label: 'Переход на страницу pinterest',
    Url: SocialRoute.Pinterest,
    Icon: '#icon-pinterest',
    IconWidth: 20,
    IconHeight: 20,
  },
  {
    Name: 'Reddit',
    Label: 'Переход на страницу reddit',
    Url: SocialRoute.Reddit,
    Icon: '#icon-reddit',
    IconWidth: 20,
    IconHeight: 20,
  },
] as const;

export const ReviewRateSettings = [
  {
    Name: 'Отлично',
    Value: 5,
  },
  {
    Name: 'Хорошо',
    Value: 4,
  },
  {
    Name: 'Нормально',
    Value: 3,
  },
  {
    Name: 'Плохо',
    Value: 2,
  },
  {
    Name: 'Ужасно',
    Value: 1,
  },
] as const;

export const BreadcrumbsSettings = {
  Root: {
    Name: 'Главная',
    Route: AppRoute.Root,
  },
  Catalog: {
    Name: 'Каталог',
    Route: AppRoute.Catalog,
  }
} as const;

export enum DefaultPriceRange {
  minPrice = 0,
  maxPrice = 0,
}

export enum DefaultCamera {
  id = 0,
  name = '',
  vendorCode = '',
  type = '',
  category = '',
  description = '',
  level = '',
  rating = 0,
  price = 0,
  previewImg = '',
  previewImg2x = '',
  previewImgWebp = '',
  previewImgWebp2x = '',
  reviewCount = 0,
}

export enum DefaultPromo {
  id = 0,
  name = '',
  previewImg = '',
  previewImg2x = '',
  previewImgWebp = '',
  previewImgWebp2x = '',
}
