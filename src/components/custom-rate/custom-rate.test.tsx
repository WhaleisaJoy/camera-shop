import { render } from '@testing-library/react';
import { lorem } from 'faker/locale/ru';
import { FormProvider, useForm } from 'react-hook-form';
import CustomRate from './custom-rate';

describe('Component: CustomRate', () => {
  it('should render correctly', () => {
    const Wrapper = () => {
      const methods = useForm<{ test: string }>({ defaultValues: { test: 'test' } });

      const fakeCustomRateProps = {
        register: methods.register('test'),
        isValid: '',
        errors: methods.formState.errors.test,
        errorText: lorem.sentence(),
      };

      return (
        <FormProvider {...methods}>
          <CustomRate
            register={fakeCustomRateProps.register}
            isValid={fakeCustomRateProps.isValid}
            errors={fakeCustomRateProps.errors}
            errorText={fakeCustomRateProps.errorText}
          />
        </FormProvider>
      );
    };

    const { container } = render(<Wrapper />);

    expect(container.querySelector('.rate')).toBeInTheDocument();
  });
});
