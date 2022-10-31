import { datatype, date, image, internet, lorem } from 'faker';
import { RatingSettings } from '../database';
import { Camera } from '../types/camera';
import { PromoType } from '../types/promo';
import { PostReview, Review } from '../types/review';

export const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: lorem.word(),
  vendorCode: lorem.word(),
  type: lorem.word(),
  category: lorem.word(),
  description: lorem.sentences(),
  level: lorem.word(),
  rating: datatype.number(RatingSettings[4].Value),
  price: datatype.number(),
  previewImg: image.image(),
  previewImg2x: image.image(),
  previewImgWebp: image.image(),
  previewImgWebp2x: image.image(),
  reviewCount: datatype.number(),
});

export const makeFakePromo = (): PromoType => ({
  id: datatype.number(),
  name: lorem.word(),
  previewImg: image.image(),
  previewImg2x: image.image(),
  previewImgWebp: image.image(),
  previewImgWebp2x: image.image(),
});

export const makeFakeReview = (): Review => ({
  id: lorem.word(),
  userName: lorem.word(),
  advantage: lorem.words(),
  disadvantage: lorem.words(),
  review: lorem.sentences(),
  rating: datatype.number(),
  createAt: date.recent().toISOString(),
  cameraId: datatype.number(),
});

export const makeFakePostReview = (): PostReview => ({
  cameraId: datatype.number(),
  userName: lorem.word(),
  advantage: lorem.words(),
  disadvantage: lorem.words(),
  review: lorem.sentences(),
  rating: datatype.number(),
});

export const makeFakeFooterNavSettings = () => ({
  Name: lorem.word(),
  Content: [
    {
      Name: lorem.word(),
      Url: `/${lorem.word()}`,
    },
  ],
});


