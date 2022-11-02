import { render, screen } from '@testing-library/react';
import { lorem } from 'faker/locale/ru';
import { FormProvider, useForm } from 'react-hook-form';
import CustomInput from './custom-input';

describe('Component: CustomInput', () => {
  it('should render correctly', () => {
    const Wrapper = () => {
      const methods = useForm<{ test: string }>({ defaultValues: { test: 'test' } });

      const fakeCustomInputProps = {
        label: lorem.words(),
        register: methods.register('test'),
        placeholder: lorem.sentence(),
        autoFocus: false,
        isValid: '',
        errors: methods.formState.errors.test,
        errorText: lorem.sentence(),
      };

      return (
        <FormProvider {...methods}>
          <CustomInput
            label={fakeCustomInputProps.label}
            register={fakeCustomInputProps.register}
            placeholder={fakeCustomInputProps.placeholder}
            autoFocus={fakeCustomInputProps.autoFocus}
            isValid={fakeCustomInputProps.isValid}
            errors={fakeCustomInputProps.errors}
            errorText={fakeCustomInputProps.errorText}
          />
        </FormProvider>
      );
    };

    render(<Wrapper />);

    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
  });
});
