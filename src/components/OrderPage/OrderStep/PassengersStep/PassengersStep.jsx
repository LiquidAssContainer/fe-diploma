import './style.sass';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { NextStepButton } from '../../OrderPage';

import { setNextStep } from 'reducers/stepper';
import { PassengerFormAdd } from './PassengersStepComponents';
import { PassengerForm } from './PassengerForm';

export const PassengersStep = () => {
  // const { selectedAmount } = useSelector((state) => state.seats);
  const selectedAmount = 2;

  const refArray = useRef([]);

  // const formObjects = {};
  // for (let i = 0; i < selectedAmount; i++) {
  //   formObjects[i] = {
  //     data: null,
  //     isValid: false,
  //     ref: useRef(),
  //   };
  // }

  const forms = [...Array(selectedAmount)].map((_, i) => ({
    data: null,
    isValid: false,
    isExpanded: !i,
    // ref: useRef(),
  }));

  // const passengers = Object.values(formObjects);

  const dispatch = useDispatch();

  const [passengers, setForms] = useState(forms);
  const [areFormsValid, setAreFormsValid] = useState(false);
  // const history = useHistory();

  const onNextPassengerClick = (i) => {
    const nextForm = refArray.current[i + 1];
    if (nextForm) {
      const formsState = [...passengers];
      // formsState[i].isExpanded = false;
      formsState[i + 1].isExpanded = true;
      setForms([...formsState]);
      nextForm.scrollIntoView({ behavior: 'smooth' });
    }
    // passengers[i + 1].isExpanded = true;
  };

  const handleNextStepClick = () => {
    // if (selectedAmount > 0) {
    dispatch(setNextStep());
    // history.push(`/seats/${id}/order`);
    // }
  };

  const onFormChange = (index, isValid) => {
    const formsState = [...passengers];
    formsState[index].isValid = isValid;
    setForms(formsState);

    const isThereInvalidForm = passengers.find(({ isValid }) => !isValid);
    setAreFormsValid(!isThereInvalidForm);
  };

  return (
    <>
      {passengers.map(({ isExpanded }, i) => (
        <PassengerForm
          key={i}
          onFormChange={onFormChange}
          number={i + 1}
          passengers={passengers}
          isExpandedProp={isExpanded}
          formIndex={i}
          onNextPassengerClick={onNextPassengerClick}
          innerRef={(ref) => {
            refArray.current[i] = ref;
          }}
        />
      ))}
      <PassengerFormAdd />
      <NextStepButton onClick={handleNextStepClick} disabled={!areFormsValid}>
        Далее
      </NextStepButton>
    </>
  );
};
