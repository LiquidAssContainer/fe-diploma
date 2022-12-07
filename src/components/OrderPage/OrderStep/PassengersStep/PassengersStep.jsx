import './style.sass';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PassengerForm } from './PassengerForm';
import { PassengerFormAdd } from './PassengersStepComponents';
import { NextStepButton, PrevStepButton } from 'components/OrderPage';

import { setPassengerForms } from 'reducers/order';

export const PassengersStep = () => {
  const { selectedAmount } = useSelector((state) => state.seats);

  const refArray = useRef([]);

  const initialForms = [...Array(selectedAmount)].map((_, i) => ({
    data: null,
    isValid: false,
    isExpanded: !i,
  }));

  const dispatch = useDispatch();

  const [forms, setForms] = useState(initialForms);
  const [areFormsValid, setAreFormsValid] = useState(false);

  const onNextPassengerClick = (i) => {
    const nextForm = refArray.current[i + 1];
    if (nextForm) {
      const formsState = [...forms];
      formsState[i + 1].isExpanded = true;
      setForms([...formsState]);
      nextForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onRemovePassenger = (index) => {
    const splicedForm = [...forms];
    splicedForm.splice(index, 1);
    setForms(splicedForm);
  };

  const onAddPassenger = () => {
    if (forms.length < 5) {
      setForms([
        ...forms,
        {
          data: null,
          isValid: false,
          isExpanded: false,
        },
      ]);
    }
  };

  const handleNextStepClick = () => {
    const formsData = forms.reduce((acc, curr) => {
      acc.push(curr.data);
      return acc;
    }, []);

    dispatch(setPassengerForms(formsData));
  };

  const onFormChange = (data, index, isValid) => {
    const formsState = [...forms];
    formsState[index].data = data;
    formsState[index].isValid = isValid;
    setForms(formsState);

    const isThereInvalidForm = forms.find(({ isValid }) => !isValid);
    setAreFormsValid(!isThereInvalidForm);
  };

  return (
    <>
      {forms.map(({ isExpanded }, i) => (
        <PassengerForm
          key={i}
          onFormChange={onFormChange}
          // number={i + 1}
          passengers={forms}
          isExpandedProp={isExpanded}
          formIndex={i}
          onNextPassengerClick={onNextPassengerClick}
          onRemovePassenger={onRemovePassenger}
          isLast={i + 1 === forms.length}
          innerRef={(ref) => {
            refArray.current[i] = ref;
          }}
        />
      ))}
      <PassengerFormAdd onAddPassenger={onAddPassenger} />

      <div className="step-buttons__container">
        <PrevStepButton type="prev">Назад</PrevStepButton>
        <NextStepButton
          type="next"
          disabled={!areFormsValid}
          onClick={handleNextStepClick}
        >
          Далее
        </NextStepButton>
      </div>
    </>
  );
};
