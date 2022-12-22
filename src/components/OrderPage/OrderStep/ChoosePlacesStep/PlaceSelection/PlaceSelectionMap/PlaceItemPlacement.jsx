import './style.sass';

import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { changeSeatSelection } from 'reducers/seats';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

export const FirstClassPlacement = ({
  firstNumber,
  top_price,
  bottom_price,
  ...props
}) => {
  return (
    <PlaceItemPlacement>
      <PlaceItemRow railcarClass="first">
        <PlaceItem
          {...props}
          placeNumber={firstNumber}
          railcarClass="first"
          price={top_price}
        />
      </PlaceItemRow>
      <PlaceItemRow railcarClass="first">
        <PlaceItem
          {...props}
          placeNumber={firstNumber + 1}
          railcarClass="first"
          price={bottom_price}
        />
      </PlaceItemRow>
    </PlaceItemPlacement>
  );
};

export const SecondClassPlacement = ({ firstNumber, ...props }) => {
  return (
    <SecondAndThirdClassPlacement
      {...props}
      railcarClass="second"
      firstNumber={firstNumber}
    />
  );
};

export const ThirdClassPlacement = ({ firstNumber, ...props }) => {
  return (
    <SecondAndThirdClassPlacement
      {...props}
      railcarClass="third"
      firstNumber={firstNumber}
    />
  );
};

const SecondAndThirdClassPlacement = ({
  railcarClass,
  firstNumber,
  top_price,
  bottom_price,
  ...props
}) => {
  return (
    <PlaceItemPlacement>
      <PlaceItemRow railcarClass={railcarClass}>
        <PlaceItem
          {...props}
          placeNumber={firstNumber}
          railcarClass={railcarClass}
          price={bottom_price}
        />
        <PlaceItem
          {...props}
          placeNumber={firstNumber + 1}
          railcarClass={railcarClass}
          price={top_price}
        />
      </PlaceItemRow>
      <PlaceItemRow railcarClass={railcarClass}>
        <PlaceItem
          {...props}
          placeNumber={firstNumber + 2}
          railcarClass={railcarClass}
          price={bottom_price}
        />
        <PlaceItem
          {...props}
          placeNumber={firstNumber + 3}
          railcarClass={railcarClass}
          price={top_price}
        />
      </PlaceItemRow>
    </PlaceItemPlacement>
  );
};

const PlaceItemPlacement = ({ children }) => {
  return <li className={`place__placement`}>{children}</li>;
};

export const PlaceItemRow = ({ children, railcarClass }) => {
  return (
    <div className={cn('place__row', `place__row_${railcarClass}-class`)}>
      {children}
    </div>
  );
};

export const PlaceItem = ({
  placeNumber,
  railcarClass,
  isLeftSide,
  railcarId,
  seats,
  price = 0,
}) => {
  const {
    selectedSeats,
    selectedAmount,
    passengersAmount: {
      adult: { amount: adultAmount, selected: adultSelected },
      child: { amount: childAmount, selected: childSelected },
    },
  } = useSelector((state) => state.seats);

  const seat = seats[placeNumber - 1];
  const dispatch = useDispatch();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onPopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleClick = () => {
    const newValue = !seat.isSelected;

    let type;

    if (newValue) {
      if (selectedSeats.length === selectedAmount) {
        return;
      }

      if (childSelected < childAmount) {
        if (adultSelected < adultAmount) {
          setIsPopupOpen(true);
          return;
        } else {
          type = 'child';
        }
      } else {
        type = 'adult';
      }
    }

    dispatch(
      changeSeatSelection({
        railcarId,
        railcarClass,
        placeNumber,
        value: newValue,
        price,
        type,
      }),
    );
  };

  const onTicketTypeClick = (type) => {
    setIsPopupOpen(false);
    dispatch(
      changeSeatSelection({
        railcarId,
        railcarClass,
        placeNumber,
        value: true,
        price,
        type,
      }),
    );
  };

  return (
    <div className="place__item_container">
      <button
        className={cn('place__item', {
          [`place__item_${railcarClass}-class`]: railcarClass,
          'place__item_left-train-side': isLeftSide,
          selected: seat?.isSelected,
        })}
        disabled={!seat?.available}
        onClick={handleClick}
      >
        {placeNumber}
      </button>
      {isPopupOpen && (
        <PlaceItemPopup
          isOpen={isPopupOpen}
          onClose={onPopupClose}
          onBtnClick={onTicketTypeClick}
        />
      )}
    </div>
  );
};

const PlaceItemPopup = ({ onClose, onBtnClick }) => {
  const ref = useRef();

  useOnClickOutside(ref, onClose);

  return (
    <div ref={ref} className="place__item_popup">
      <button
        className="place__item_popup_button"
        onClick={() => onBtnClick('adult')}
      >
        Взрослый
      </button>
      <button
        className="place__item_popup_button"
        onClick={() => onBtnClick('child')}
      >
        Детский
      </button>
    </div>
  );
};
