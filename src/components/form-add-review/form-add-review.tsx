import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { LoadingStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { getReviewSendingStatus } from '../../store/reviews-data/selectors';
import type { PostReview } from '../../types/review';
import CustomInput from '../custom-input/custom-input';
import CustomRate from '../custom-rate/custom-rate';
import CustomTextarea from '../custom-textarea/custom-textarea';

type FormAddReviewProps = {
  id: string | undefined;
};

function FormAddReview({ id }: FormAddReviewProps): JSX.Element {
  const dispatch = useAppDispatch();

  const reviewSendingStatus = useSelector(getReviewSendingStatus);

  const { register, handleSubmit, formState: { errors } } = useForm<PostReview>();

  const checkIfValid = (name: keyof PostReview) => errors[name] ? 'is-invalid' : '';

  const onFormSubmit = (data: PostReview) => {
    dispatch(postReviewAction({
      ...data,
      rating: Number(data.rating),
      cameraId: Number(id),
    }));
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onFormSubmit) as VoidFunction}
    >
      <div className="form-review__rate">
        <CustomRate
          register={register('rating', { required: true })}
          isValid={checkIfValid('rating')}
          errors={errors.rating}
          errorText={'Нужно оценить товар'}
        />

        <CustomInput
          label={'Ваше имя'}
          register={register('userName', { required: true })}
          placeholder={'Введите ваше имя'}
          autoFocus
          isValid={checkIfValid('userName')}
          errors={errors.userName}
          errorText={'Нужно указать имя'}
        />
        <CustomInput
          label={'Достоинства'}
          register={register('advantage', { required: true })}
          placeholder={'Основные преимущества товара'}
          isValid={checkIfValid('advantage')}
          errors={errors.advantage}
          errorText={'Нужно указать достоинства'}
        />
        <CustomInput
          label={'Недостатки'}
          register={register('disadvantage', { required: true })}
          placeholder={'Главные недостатки товара'}
          isValid={checkIfValid('disadvantage')}
          errors={errors.disadvantage}
          errorText={'Нужно указать недостатки'}
        />

        <CustomTextarea
          label={'Комментарий'}
          register={register('review', {
            required: 'Нужно добавить комментарий',
            minLength: {
              value: 5,
              message: 'Минимальная длина — 5 символов'
            }
          })}
          placeholder={'Поделитесь своим опытом покупки'}
          isValid={checkIfValid('review')}
          errors={errors.review}
          errorText={errors.review?.message}
        />
      </div>

      <button
        className="btn btn--purple form-review__btn"
        type="submit"
        disabled={reviewSendingStatus === LoadingStatus.Pending}
      >
        Отправить отзыв
      </button>
    </form>
  );
}

export default FormAddReview;
