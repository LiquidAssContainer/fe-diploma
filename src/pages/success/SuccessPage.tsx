import './style.sass';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Header } from 'widgets/header';

import { setStep } from 'entities/steps/model';
import { SuccessfulOrder } from 'widgets/successful-order';

export const SuccessPage = () => {
  const dispatch = useDispatch();

  useEffect((): any => {
    window.scrollTo(0, 0);

    return () => dispatch(setStep(1));
  }, []);

  return (
    <div className="success-page__container">
      <section className="success-page__header">
        <Header />
        <div className="success-page__header_text hero_content_text text_accent">
          Благодарим вас за заказ!
        </div>
      </section>

      <section className="success-page__content_section">
        <SuccessfulOrder />
      </section>
    </div>
  );
};
