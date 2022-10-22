import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BackToTop from '../../components/back-to-top/back-to-top';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductInfo from '../../components/product-info/product-info';
import ProductSimilar from '../../components/product-similar/product-similar';
import { useAppDispatch } from '../../hooks';
import { fetchCurrentCameraAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { dropCurrentCamera } from '../../store/data-reducer/data-reducer';
import { getCurrentCamera, getLoadedCurrentCameraStatus, getLoadedSimilarStatus, getSimilar } from '../../store/data-reducer/selectors';
import LoadingPage from '../loading-page/loading-page';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams<string>();

  useEffect(() => {
    id && dispatch(fetchCurrentCameraAction(id));

    return () => {
      dispatch(dropCurrentCamera());
    };
  }, [dispatch, id]);

  useEffect(() => {
    id && dispatch(fetchSimilarCamerasAction(id));
  }, [id, dispatch]);

  const currentCamera = useSelector(getCurrentCamera);
  const similarCameras = useSelector(getSimilar);

  const isCurrentCameraLoaded = useSelector(getLoadedCurrentCameraStatus);
  const isSimilarLoaded = useSelector(getLoadedSimilarStatus);

  if (isCurrentCameraLoaded || isSimilarLoaded) {
    return <LoadingPage />;
  }

  return (
    <>
      <main>
        <div className="page-content">
          <Breadcrumbs />

          <div className="page-content__section">
            <ProductInfo camera={currentCamera} />
          </div>
          {
            similarCameras.length > 0 && (
              <div className="page-content__section">
                <ProductSimilar similarCameras={similarCameras} />
              </div>
            )
          }
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button className="btn" type="button">Оставить свой отзыв</button>
                </div>
                <ul className="review-block__list">
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Сергей Горский</p>
                      <time className="review-card__data" dateTime="2022-04-13">13 апреля</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 5</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Надёжная, хорошо лежит в руке, необычно выглядит</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Тяжеловата, сложно найти плёнку</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы. Ни у кого из знакомых такой нет, все завидуют) Теперь это жемчужина моей коллекции, однозначно стоит своих денег!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Пётр Матросов</p>
                      <time className="review-card__data" dateTime="2022-03-02">2 марта</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 1</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Хорошее пресс-папье</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Через 3 дня развалилась на куски</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">При попытке вставить плёнку сломался механизм открытия отсека, пришлось заклеить его изолентой. Начал настраивать фокус&nbsp;— линза провалилась внутрь корпуса. Пока доставал — отломилось несколько лепестков диафрагмы. От злости стукнул камеру об стол, и рукоятка треснула пополам. Склеил всё суперклеем, теперь прижимаю ей бумагу. НЕ РЕКОМЕНДУЮ!!!</p>
                      </li>
                    </ul>
                  </li>
                  <li className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">Татьяна Кузнецова </p>
                      <time className="review-card__data" dateTime="2021-12-30">30 декабря</time>
                    </div>
                    <div className="rate review-card__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Оценка: 4</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list"><span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">Редкая</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">Высокая цена</p>
                      </li>
                      <li className="item-list"><span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">Дорого для портативной видеокамеры, но в моей коллекции как раз не хватало такого экземпляра. Следов использования нет, доставили в заводской упаковке, выглядит шикарно!</p>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="review-block__buttons">
                  <button className="btn btn--purple" type="button">Показать больше отзывов
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div >
      </main >

      <BackToTop />
    </>
  );
}

export default ProductPage;
