import './style.sass';

import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { changeSeatSelection } from 'reducers/seats';

export const FirstClassPlacement = ({ firstNumber, ...props }) => {
  return (
    <PlaceItemPlacement>
      <PlaceItemRow railcarClass="first">
        <PlaceItem {...props} placeNumber={firstNumber} railcarClass="first" />
      </PlaceItemRow>
      <PlaceItemRow railcarClass="first">
        <PlaceItem
          {...props}
          placeNumber={firstNumber + 1}
          railcarClass="first"
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
  ...props
}) => {
  return (
    <PlaceItemPlacement>
      <PlaceItemRow railcarClass={railcarClass}>
        <PlaceItem
          {...props}
          placeNumber={firstNumber}
          railcarClass={railcarClass}
        />
        <PlaceItem
          {...props}
          placeNumber={firstNumber + 1}
          railcarClass={railcarClass}
        />
      </PlaceItemRow>
      <PlaceItemRow railcarClass={railcarClass}>
        <PlaceItem
          {...props}
          placeNumber={firstNumber + 2}
          railcarClass={railcarClass}
        />
        <PlaceItem
          {...props}
          placeNumber={firstNumber + 3}
          railcarClass={railcarClass}
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
}) => {
  const seat = seats[placeNumber - 1];
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeSeatSelection({ railcarId, railcarClass, placeNumber }));
  };

  return (
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
  );
};
