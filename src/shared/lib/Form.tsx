import { FC, PropsWithChildren } from 'react';
import { FormProvider } from 'react-hook-form';

export const Form: FC<any> = (props: any) => {
  const { form, onSubmit: submit, children, ...rest } = props;

  const onSubmit = form.handleSubmit(submit);

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};
