import './style.sass';

import { useSelector } from 'react-redux';

import { ReactComponent as ConditionerIcon } from 'assets/icons/conditioner.svg';
import { ReactComponent as WiFiIcon } from 'assets/icons/wifi.svg';
import { ReactComponent as BedclothesIcon } from 'assets/icons/bedclothes.svg';
import { ReactComponent as DrinksIcon } from 'assets/icons/drinks.svg';
import { formatNumber } from 'lib/helpers';

const seatTypes = [
  { priceName: 'top_price', label: 'Верхние' },
  { priceName: 'bottom_price', label: 'Нижние' },
  { priceName: 'side_price', label: 'Боковые' },
];

export const PlacesTable = ({
  available_seats = 0,
  // top_price = 0,
  // bottom_price = 0,
  // side_price = 0,
  have_wifi = false,
  have_air_conditioning = false,
  linens_price = 76,
  wifi_price = 226,
  is_linens_included = true,
  ...props
}) => {
  // const { seatsInfo, selectedRailcarClass } = useSelector(
  //   (state) => state.seats,
  // );
  // const { coach } = seatsInfo[selectedRailcarClass];

  return (
    <div className="places__table">
      <PlacesTableCol>
        <PlacesTableCell type="header">
          <span>Места </span>
          <PlacesTableQuantity>{available_seats}</PlacesTableQuantity>
        </PlacesTableCell>
        {seatTypes.map(({ priceName, label }) => {
          if (props[priceName]) {
            return (
              <PlacesTableCell type="seat-type">
                <span>{label} </span>
                <PlacesTableQuantity>3</PlacesTableQuantity>
              </PlacesTableCell>
            );
          }
        })}
        {/* {top_price > 0 && (
          <PlacesTableCell type="seat-type">
            <span>Верхние </span>
            <PlacesTableQuantity>3</PlacesTableQuantity>
          </PlacesTableCell>
        )}
        {bottom_price > 0 && (
          <PlacesTableCell type="seat-type">
            <span>Нижние </span>
            <PlacesTableQuantity>8</PlacesTableQuantity>
          </PlacesTableCell>
        )}
        {side_price > 0 && (
          <PlacesTableCell type="seat-type">
            <span>Сбоку </span>
            <PlacesTableQuantity>8</PlacesTableQuantity>
          </PlacesTableCell>
        )} */}
      </PlacesTableCol>

      <PlacesTableCol>
        <PlacesTableCell type="header">
          <span>Стоимость</span>
        </PlacesTableCell>
        {seatTypes.map(({ priceName }) => {
          if (props[priceName]) {
            return (
              <PlacesTableCell type="price">
                <span>{formatNumber(props[priceName])} </span>
                <PlacesTableCurrencySign />
              </PlacesTableCell>
            );
          }
        })}
        {/* <PlacesTableCell type="price">
          <span>{top_price} </span>
          <PlacesTableCurrencySign />
        </PlacesTableCell>
        <PlacesTableCell type="price">
          <span>{bottom_price} </span>
          <PlacesTableCurrencySign />
        </PlacesTableCell> */}
      </PlacesTableCol>

      <PlacesTableCol>
        <PlacesTableCell type="header">
          <span>Обслуживание </span>
          <span className="places__table_fpc">ФПК</span>
        </PlacesTableCell>
        <PlacesTableCell type="features">
          <PlacesTableFeature Icon={ConditionerIcon} title="кондиционер" />
          <PlacesTableFeature Icon={WiFiIcon} title="wi-fi" />
          <PlacesTableFeature Icon={BedclothesIcon} title="постельное бельё" />
          <PlacesTableFeature Icon={DrinksIcon} title="напитки" />
        </PlacesTableCell>
      </PlacesTableCol>
    </div>
  );
};

const PlacesTableCol = ({ children }) => {
  return <div className="places__table_column">{children}</div>;
};

const PlacesTableCell = ({ children, type }) => {
  return <div className={`places__table_cell_${type}`}>{children}</div>;
};

const PlacesTableQuantity = ({ children }) => {
  return <span className="places__table_quantity">{children}</span>;
};

const PlacesTableCurrencySign = () => {
  return <span className="places__table_currency">₽</span>;
};

const PlacesTableFeature = ({ Icon, title }) => {
  return (
    <div className="places__table_feature">
      <Icon className="places__table_feature_icon" />
      <div className="places__table_feature_title">{title}</div>
    </div>
  );
};
