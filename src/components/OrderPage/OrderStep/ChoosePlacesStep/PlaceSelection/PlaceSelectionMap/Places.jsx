import './style.sass';

import cn from 'classnames';

import {
  FirstClassPlacement,
  PlaceItem,
  PlaceItemRow,
  SecondClassPlacement,
  ThirdClassPlacement,
} from './PlaceItemPlacement';

export const FirstClassPlaces = () => {
  return (
    <PlaceListContainer railcarClass="first">
      <PlaceItemList railcarClass="first">
        {[...Array(8)].map((_, i) => {
          return <FirstClassPlacement firstNumber={i * 2 + 1} />;
        })}
      </PlaceItemList>
      <PlaceItemListEmpty />
    </PlaceListContainer>
  );
};

export const SecondClassPlaces = () => {
  return (
    <PlaceListContainer railcarClass="second">
      <PlaceItemList railcarClass="second">
        {[...Array(8)].map((_, i) => {
          return <SecondClassPlacement firstNumber={i * 4 + 1} />;
        })}
      </PlaceItemList>
      <PlaceItemListEmpty />
    </PlaceListContainer>
  );
};

export const ThirdClassPlaces = () => {
  return (
    <PlaceListContainer railcarClass="third">
      <PlaceItemList railcarClass="third">
        {[...Array(8)].map((_, i) => {
          return <ThirdClassPlacement firstNumber={i * 4 + 1} />;
        })}
      </PlaceItemList>
      <PlaceItemList railcarClass="third" isLeftSide={true}>
        {[...Array(8)].map((_, i) => (
          <li className="place__row_left-train-side">
            <PlaceItem placeNumber={i * 2 + 33} isLeftSide={true} />
            <PlaceItem placeNumber={i * 2 + 34} isLeftSide={true} />
          </li>
        ))}
      </PlaceItemList>
    </PlaceListContainer>
  );
};

export const FourthClassPlaces = () => {
  return (
    <PlaceListContainer railcarClass="fourth">
      <SittingPlaceItemList firstNumber={1} side="right" />
      <SittingPlaceItemList firstNumber={33} side="left" />
    </PlaceListContainer>
  );
};

const PlaceListContainer = ({ railcarClass, children }) => {
  return (
    <div
      className={cn(
        'place__list_container',
        `place__list_container_${railcarClass}-class`,
      )}
    >
      {children}
    </div>
  );
};

const PlaceItemList = ({ railcarClass, children, isLeftSide }) => {
  return (
    <ul
      className={cn(
        'place__list',
        { [`place__list_${railcarClass}-class`]: railcarClass },
        isLeftSide ? 'place__list_left-side' : 'place__list_right-side',
      )}
    >
      {children}
    </ul>
  );
};

const SittingPlaceItemList = ({ firstNumber, side }) => {
  return (
    <ul className={`place__list_fourth-class_${side}-side`}>
      {[...Array(16)].map((_, i) => {
        return (
          <PlaceItemRow railcarClass="fourth">
            <PlaceItem
              placeNumber={i * 2 + firstNumber}
              railcarClass="fourth"
            />
            <PlaceItem
              placeNumber={i * 2 + firstNumber + 1}
              railcarClass="fourth"
            />
          </PlaceItemRow>
        );
      })}
    </ul>
  );
};

const PlaceItemListEmpty = () => {
  return (
    <PlaceItemList isLeftSide={true}>
      {[...Array(8)].map((_, i) => {
        return <div className="place__row_left-train-side place__row_empty" />;
      })}
    </PlaceItemList>
  );
};
