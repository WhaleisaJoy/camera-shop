import IconSnowflake from '../icon-snowflake/icon-snowflake';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type CustomInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  isValid: string;
  errors: FieldError | undefined;
  errorText: string;
};

function CustomInput({ label, register, placeholder, isValid, errors, errorText }: CustomInputProps): JSX.Element {
  return (
    <div className={`custom-input form-review__item ${isValid}`}>
      <label>
        <span className="custom-input__label">
          {label}
          <IconSnowflake />
        </span>
        <input
          type="text"
          {...register}
          placeholder={placeholder}
        />
      </label>

      {errors && <p className="custom-input__error">{errorText}</p>}
    </div>
  );
}

export default CustomInput;
