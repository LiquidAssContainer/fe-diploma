import './style.sass';

import cn from 'classnames';

export const FirstClassPlacement = ({ firstNumber }) => {
  return (
    <PlaceItemPlacement>
      <PlaceItemRow railcarClass="first">
        <PlaceItem placeNumber={firstNumber} railcarClass="first" />
      </PlaceItemRow>
      <PlaceItemRow railcarClass="first">
        <PlaceItem placeNumber={firstNumber + 1} railcarClass="first" />
      </PlaceItemRow>
    </PlaceItemPlacement>
  );
};

export const SecondClassPlacement = ({ firstNumber }) => {
  return (
    <SecondAndThirdClassPlacement
      railcarClass="second"
      firstNumber={firstNumber}
    />
  );
};

export const ThirdClassPlacement = ({ firstNumber }) => {
  return (
    <SecondAndThirdClassPlacement
      railcarClass="third"
      firstNumber={firstNumber}
    />
  );
};

const SecondAndThirdClassPlacement = ({ railcarClass, firstNumber }) => {
  return (
    <PlaceItemPlacement>
      <PlaceItemRow railcarClass={railcarClass}>
        <PlaceItem placeNumber={firstNumber} railcarClass={railcarClass} />
        <PlaceItem placeNumber={firstNumber + 1} railcarClass={railcarClass} />
      </PlaceItemRow>
      <PlaceItemRow railcarClass={railcarClass}>
        <PlaceItem placeNumber={firstNumber + 2} railcarClass={railcarClass} />
        <PlaceItem placeNumber={firstNumber + 3} railcarClass={railcarClass} />
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

export const PlaceItem = ({ placeNumber, railcarClass, isLeftSide }) => {
  return (
    <div
      className={cn('place__item', {
        [`place__item_${railcarClass}-class`]: railcarClass,
        'place__item_left-train-side': isLeftSide,
      })}
    >
      {placeNumber}
    </div>
  );
};
