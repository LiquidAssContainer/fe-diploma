import './style.sass';

import { PlaceSelectionMap } from './PlaceSelectionMap';
import { PlacesTable } from './PlacesTable';

export const PlaceSelection = ({ railcarClass }) => {
  return (
    <div className="places__choosing">
      <header className="places__choosing_header">
        <div className="places__choosing_railcars">
          <div className="railcar__text">Вагоны</div>
          <ul className="railcar__list">
            <div className="railcar__item selected">07</div>
            <div className="railcar__item">09</div>
          </ul>
        </div>
        <div className="places__choosing_remark">
          Нумерация вагонов начинается с головы поезда
        </div>
      </header>
      <div>
        <PlacesChoosingRailcar />
        <PlacesChoosingRailcar />
      </div>
      {/* todo */}
      <div className="places__price">
        <span className="places__price_number">5 760</span> ₽
      </div>
    </div>
  );
};

const PlacesChoosingRailcar = () => {
  return (
    <div className="places__choosing_railcar">
      <div className="places__choosing_info">
        <div className="railcar__number">
          <div className="railcar__number_digit">07</div>
          <div className="railcar__number_text">вагон</div>
        </div>
        <PlacesTable />
      </div>
      <div className="places__choosing_selecting-people">
        13 человек выбирают места в этом поезде
      </div>
      <PlaceSelectionMap railcarClass="second_class" />
    </div>
  );
};
