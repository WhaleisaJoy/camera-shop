import IconSnowflake from '../icon-snowflake/icon-snowflake';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type CustomInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  autoFocus?: boolean;
  isValid: string;
  errors: FieldError | undefined;
  errorText: string;
};

function CustomInput({ label, register, placeholder, autoFocus = false, isValid, errors, errorText }: CustomInputProps): JSX.Element {
  return (
    <div className={`custom-input form-review__item ${isValid}`} data-testid="custom-input">
      <label>
        <span className="custom-input__label">
          {label}
          <IconSnowflake />
        </span>
        <input
          type="text"
          {...register}
          autoFocus={autoFocus}
          placeholder={placeholder}
        />
      </label>

      {errors && <p className="custom-input__error">{errorText}</p>}
    </div>
  );
}

export default CustomInput;
