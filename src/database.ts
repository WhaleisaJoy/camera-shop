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
