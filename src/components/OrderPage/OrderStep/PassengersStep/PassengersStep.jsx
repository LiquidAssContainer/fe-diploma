import './style.sass';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PassengerFormAdd } from './PassengersStepComponents';
import { PassengerForm } from './PassengerForm';
import {
  ChangeStepButton,
  NextStepButton,
  PrevStepButton,
} from '../../OrderPage';

import { setNextStep } from 'reducers/stepper';
import { setDirectionId, setPassengerForms } from 'reducers/order';
import { useEffect } from 'react';

export const PassengersStep = () => {
  const { selectedAmount } = useSelector((state) => state.seats);
  // const selectedAmount = 2;

  const refArray = useRef([]);

  const initialForms = [...Array(selectedAmount)].map((_, i) => ({
    data: null,
    isValid: false,
    isExpanded: !i,
  }));

  // const passengers = Object.values(formObjects);

  const dispatch = useDispatch();

  const [forms, setForms] = useState(initialForms);
  const [areFormsValid, setAreFormsValid] = useState(false);
  // const history = useHistory();

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
    setForms(forms.splice(index - 1, 1));
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
    console.log(data, index, isValid);
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
          number={i + 1}
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
