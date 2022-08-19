import './style.sass';

import { ReactComponent as ConditionerIcon } from 'assets/icons/conditioner.svg';
import { ReactComponent as WiFiIcon } from 'assets/icons/wifi.svg';
import { ReactComponent as BedclothesIcon } from 'assets/icons/bedclothes.svg';
import { ReactComponent as DrinksIcon } from 'assets/icons/drinks.svg';

export const PlacesTable = () => {
  return (
    <div className="places__table">
      <PlacesTableCol>
        <PlacesTableCell type="header">
          <span>Места </span>
          <PlacesTableQuantity>21</PlacesTableQuantity>
        </PlacesTableCell>
        <PlacesTableCell type="seat-type">
          <span>Верхние </span>
          <PlacesTableQuantity>3</PlacesTableQuantity>
        </PlacesTableCell>
        <PlacesTableCell type="seat-type">
          <span>Нижние </span>
          <PlacesTableQuantity>8</PlacesTableQuantity>
        </PlacesTableCell>
      </PlacesTableCol>

      <PlacesTableCol>
        <PlacesTableCell type="header">
          <span>Стоимость</span>
        </PlacesTableCell>
        <PlacesTableCell type="price">
          <span>2 920 </span>
          <PlacesTableCurrencySign />
        </PlacesTableCell>
        <PlacesTableCell type="price">
          <span>3 530 </span>
          <PlacesTableCurrencySign />
        </PlacesTableCell>
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
