import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { EmailInput } from 'components/Input';
import { Button } from 'components/Button';
import { patternValues } from 'components/OrderPage/OrderStep/helpers';
import { Form } from 'shared/lib/Form';
import { fetchSubscribe } from '../model/subscriptionModel';
import { useAppThunkDispatch } from 'shared/lib';
import { openModal } from 'entities/modal/model';

type FormData = {
  email: string;
};

export const SubscriptionForm: FC = () => {
  const dispatch = useAppThunkDispatch();
  const form = useForm({ defaultValues: { email: '' }, mode: 'onChange' });

  const {
    formState: { isValid },
    reset,
  } = form;

  const handleSubmit = ({ email }: FormData) => {
    dispatch(fetchSubscribe(email))
      .unwrap()
      .then((message) => {
        dispatch(openModal({ type: 'info', message }));
        reset();
      })
      .catch((message) => dispatch(openModal({ type: 'error', message })));
  };

  return (
    <Form className="subscription__form" form={form} onSubmit={handleSubmit}>
      <EmailInput
        name="email"
        size="l"
        placeholder="e-mail"
        required
        pattern={{
          value: patternValues.email,
        }}
      />
      <Button
        onClick={() => {}}
        classname="footer__button"
        type="submit"
        styleName="transparent-light"
        size="l"
        disabled={!isValid}
      >
        Отправить
      </Button>
    </Form>
  );
};
