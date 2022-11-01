import { render, screen } from '@testing-library/react';
import { lorem } from 'faker/locale/ru';
import { FormProvider, useForm } from 'react-hook-form';
import CustomTextarea from './custom-textarea';

describe('Component: CustomTextarea', () => {
  it('should render correctly', () => {
    const Wrapper = () => {
      const methods = useForm<{ test: string }>({ defaultValues: { test: 'test' } });

      const fakeCustomTextareaProps = {
        label: lorem.words(),
        register: methods.register('test'),
        placeholder: lorem.sentence(),
        isValid: '',
        errors: methods.formState.errors.test,
        errorText: lorem.sentence(),
      };

      return (
        <FormProvider {...methods}>
          <CustomTextarea
            label={fakeCustomTextareaProps.label}
            register={fakeCustomTextareaProps.register}
            placeholder={fakeCustomTextareaProps.placeholder}
            isValid={fakeCustomTextareaProps.isValid}
            errors={fakeCustomTextareaProps.errors}
            errorText={fakeCustomTextareaProps.errorText}
          />
        </FormProvider>
      );
    };

    render(<Wrapper />);

    expect(screen.getByTestId('custom-textarea')).toBeInTheDocument();
  });
});
