import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import IconSnowflake from '../icon-snowflake/icon-snowflake';
import RateBar from '../rate-bar/rate-bar';

type RateBarProps = {
  register: UseFormRegisterReturn;
  isValid: string;
  errors: FieldError | undefined;
  errorText: string;
}

function CustomRate({ register, isValid, errors, errorText }: RateBarProps): JSX.Element {
  return (
    <fieldset className={`rate form-review__item ${isValid}`} data-testid="custom-rate">
      <legend className="rate__caption">
        Рейтинг
        <IconSnowflake />
      </legend>
      <RateBar register={register} />
      {errors && <p className="rate__message">{errorText}</p>}
    </fieldset>
  );
}

export default CustomRate;
