import { ReactComponent as ScreenIcon } from '../../assets/icons/screen.svg';
import { ReactComponent as BuildingIcon } from '../../assets/icons/building.svg';
import { ReactComponent as GlobeIcon } from '../../assets/icons/globe.svg';

import { cn } from '../../lib/bem';
import { nanoid } from 'nanoid';
import { Button } from 'components/Button';

const features = cn('features');

const items = [
  { Icon: ScreenIcon, text: 'Удобный заказ на сайте' },
  { Icon: BuildingIcon, text: 'Нет необходимости ехать в офис' },
  { Icon: GlobeIcon, text: 'Огромный выбор направлений' },
].map((item) => ({ ...item, id: nanoid() }));

export const Features = () => {
  return (
    <div className="features__wrapper" id="features">
      <section className="features">
        <header className="features__header">
          <h3 className="header_size_m text_light">Как это работает</h3>
          <Button style="transparent-light" size="l">
            Узнать больше
          </Button>
        </header>
        <FeatureList items={items} />
      </section>
    </div>
  );
};

const FeatureList = ({ items }) => {
  return (
    <ul className="features__list">
      {items.map((props) => (
        <FeatureItem key={props.id} {...props} />
      ))}
    </ul>
  );
};

const FeatureItem = ({ Icon, text }) => {
  return (
    <li className="features__item">
      <div className="feature__icon_wrapper">
        <Icon className="feature__icon" />
      </div>
      <div className="feature__description">{text}</div>
    </li>
  );
};
