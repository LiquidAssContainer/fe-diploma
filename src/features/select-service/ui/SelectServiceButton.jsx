import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as ConditionerIcon } from 'assets/icons/conditioner.svg';
import { ReactComponent as WiFiIcon } from 'assets/icons/wifi.svg';
import { ReactComponent as BedclothesIcon } from 'assets/icons/bedclothes.svg';
import { ReactComponent as DrinksIcon } from 'assets/icons/drinks.svg';

import { formatNumber } from 'shared/lib/helpers';
import { changeFeatureSelection, recalculatePrice } from 'reducers/seats';

const seatTypes = [
  { priceName: 'top_price', label: 'Верхние' },
  { priceName: 'bottom_price', label: 'Нижние' },
  { priceName: 'side_price', label: 'Боковые' },
];

export const PlacesTableFeature = ({
  name,
  icon: Icon,
  title,
  isIncluded,
  price = 0,
  railcarId,
}) => {
  const dispatch = useDispatch();
  const { selectedFeatures } = useSelector((state) => state.seats);

  const railcarFeatures = selectedFeatures[railcarId];
  const isSelected = railcarFeatures?.[name]?.value;

  const handleClick = () => {
    if (isIncluded) {
      return;
    }

    dispatch(
      changeFeatureSelection({
        id: railcarId,
        feature: name,
        value: !isSelected,
        price,
      }),
    );
    dispatch(recalculatePrice());
  };

  return (
    <button
      className={cn('places__table_feature', {
        included: isIncluded,
        selected: isSelected,
      })}
      onClick={handleClick}
    >
      <Icon className="places__table_feature_icon" />
      <div className="places__table_feature_title">
        {title} ({price ? `+${price} ₽` : 'включено в стоимость'})
      </div>
    </button>
  );
};
