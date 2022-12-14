import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import RateBar from './rate-bar';

describe('Component: CustomTextarea', () => {
  it('should render correctly', () => {
    const Wrapper = () => {
      const methods = useForm<{ test: string }>({ defaultValues: { test: 'test' } });

      const fakeRateBarProps = {
        register: methods.register('test'),
      };

      return (
        <FormProvider {...methods}>
          <RateBar
            register={fakeRateBarProps.register}
          />
        </FormProvider>
      );
    };

    render(<Wrapper />);

    expect(screen.getByTestId('rate-bar')).toBeInTheDocument();
  });
});

