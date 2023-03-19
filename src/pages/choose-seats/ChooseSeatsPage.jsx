import './style.sass';

import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getHours, getMinutes } from 'date-fns';
import { getPlural, pluralWords } from 'shared/lib/helpers';

import { Heading } from 'shared/ui/components/Heading';
import { Button } from 'components/Button';
import { PlaceSelection } from './PlaceSelection';
import { TicketAmountForm } from './TicketAmountForm';
import { NextStepButton } from 'features/change-step';
import { TicketDirection, TripCities } from 'components/Ticket/Ticket';

import { ReactComponent as SecondClassIcon } from 'assets/icons/second_class.svg';
import { ReactComponent as ThirdClassIcon } from 'assets/icons/third_class.svg';
import { ReactComponent as FourthClassIcon } from 'assets/icons/fourth_class.svg';
import { ReactComponent as FirstClassIcon } from 'assets/icons/first_class.svg';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { ReactComponent as TrainIcon } from 'assets/icons/train.svg';
import { ReactComponent as ArrowInRectangleLarge } from 'assets/icons/arrow_in_rectangle_large.svg';

import { changeSelectedRailcarType, getSeatsDetailAsync } from 'reducers/seats';
import { setDirectionId } from 'reducers/order';

const railcarTypes = [
  { name: 'fourth', label: 'Сидячий', Icon: FourthClassIcon },
  { name: 'third', label: 'Плацкарт', Icon: ThirdClassIcon },
  { name: 'second', label: 'Купе', Icon: SecondClassIcon },
  { name: 'first', label: 'Люкс', Icon: FirstClassIcon },
];

export const ChoosePlaces = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();

  const { additionalPassenger } = useSelector((state) => state.seats);
  const history = useHistory();
  const {
    tripInfo,
    seatsInfo,
    selectedAmount,
    selectedSeats: { length: selectedSeats },
  } = useSelector((state) => state.seats);

  const handleNextStepClick = () => {
    history.push(`/seats/${id}/order`);
  };

  useEffect(() => {
    dispatch(setDirectionId(id));

    if (!seatsInfo) {
      dispatch(getSeatsDetailAsync(id));
    }
  }, []);

  return (
    <>
      <Heading size="s" className="uppercase">
        Выбор мест
      </Heading>
      <div className="places__block_list">
        <ChoosePlacesBlock
          {...tripInfo}
          seatsInfo={seatsInfo}
          direction="forward"
        />
        {/* <ChoosePlacesBlock direction="return" /> */}
      </div>
      {!additionalPassenger && (
        <NextStepButton
          disabled={!selectedAmount || selectedSeats !== selectedAmount}
          onClick={handleNextStepClick}
        >
          Далее
        </NextStepButton>
      )}
    </>
  );
};
