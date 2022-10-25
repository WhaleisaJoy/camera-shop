import IconSnowflake from '../icon-snowflake/icon-snowflake';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type CustomInputProps = {
  label: string;
  register: UseFormRegisterReturn;
  placeholder: string;
  isValid: string;
  errors: FieldError | undefined;
  errorText: string | undefined;
};

function CustomTextarea({ label, register, placeholder, isValid, errors, errorText }: CustomInputProps): JSX.Element {
  return (
    <div className={`custom-textarea form-review__item ${isValid}`}>
      <label>
        <span className="custom-textarea__label">
          {label}
          <IconSnowflake />
        </span>
        <textarea
          {...register}
          placeholder={placeholder}
        >
        </textarea>
      </label>
      {errors && <div className="custom-textarea__error">{errorText}</div>}
    </div>
  );
}

export default CustomTextarea;
