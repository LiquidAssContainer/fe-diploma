import { nanoid } from 'nanoid';

import { ReactComponent as ScreenIcon } from '../../assets/icons/screen.svg';
import { ReactComponent as BuildingIcon } from '../../assets/icons/building.svg';
import { ReactComponent as GlobeIcon } from '../../assets/icons/globe.svg';

import { Button } from 'components/Button';
import { Header } from 'components/Header';

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
          <Header size="m" className="text_light">
            Как это работает
          </Header>
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
