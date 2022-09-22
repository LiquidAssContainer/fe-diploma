import './style.sass';

import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { PlaceSelectionMap } from './PlaceSelectionMap';
import { PlacesTable } from './PlacesTable';
import { changeRailcarSelection } from 'reducers/seats';
import { formatNumber } from 'lib/helpers';

export const PlaceSelection = ({ railcarClass }) => {
  const dispatch = useDispatch();
  const { seatsInfo, totalPrice } = useSelector((state) => state.seats);

  const railcarList = seatsInfo[railcarClass];

  const onRailcarClick = (id) => {
    dispatch(changeRailcarSelection({ id, railcarClass }));
  };

  return (
    <div className="places__choosing">
      <header className="places__choosing_header">
        <div className="places__choosing_railcars">
          <div className="railcar__text">Вагоны</div>
          <ul className="railcar__list">
            {railcarList.map(({ coach: { name, _id, isSelected } }) => {
              return (
                <button
                  className={cn('railcar__item', {
                    selected: isSelected,
                  })}
                  type="button"
                  onClick={() => {
                    onRailcarClick(_id);
                  }}
                >
                  {name}
                </button>
              );
            })}
          </ul>
        </div>
        <div className="places__choosing_remark">
          Нумерация вагонов начинается с головы поезда
        </div>
      </header>
      <ul>
        {railcarList.map((railcar) => {
          return (
            railcar.coach.isSelected && (
              <PlacesChoosingRailcar {...railcar} railcarClass={railcarClass} />
            )
          );
        })}
      </ul>

      {/* todo */}
      <div className="places__price">
        <span className="places__price_number">{formatNumber(totalPrice)}</span>{' '}
        ₽
      </div>
    </div>
  );
};

const PlacesChoosingRailcar = ({ coach, seats, railcarClass }) => {
  return (
    <div className="places__choosing_railcar">
      <div className="places__choosing_info">
        <div className="railcar__number">
          {/* нигде в данных не вижу номеров вагона в виде цифр */}
          <div className="railcar__number_digit">00</div>
          <div className="railcar__number_text">вагон</div>
        </div>
        <PlacesTable {...coach} />
      </div>
      <div className="places__choosing_selecting-people">
        {/* не приходит с бека ↓ */}
        13 человек выбирают места в этом поезде
      </div>
      <PlaceSelectionMap
        seats={seats}
        railcarId={coach._id}
        railcarClass={railcarClass}
      />
    </div>
  );
};
