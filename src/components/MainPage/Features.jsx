import { ReactComponent as ScreenIcon } from '../../assets/icons/screen.svg';
import { ReactComponent as BuildingIcon } from '../../assets/icons/building.svg';
import { ReactComponent as GlobeIcon } from '../../assets/icons/globe.svg';

import { cn } from '../../lib/bem';

export const Features = () => {
  const features = cn('features');

  const items = [
    { Icon: ScreenIcon, text: 'Удобный заказ на сайте' },
    { Icon: BuildingIcon, text: 'Нет необходимости ехать в офис' },
    { Icon: GlobeIcon, text: 'Огромный выбор направлений' },
  ];

  return (
    <section className={features()}>
      <header className={features('header')}>
        <h3 className="section_header text_light">Как это работает</h3>
        <a className={features('btn')}>Узнать больше</a>
      </header>
      <FeatureList items={items} />
    </section>
  );
};

const FeatureList = ({ items }) => {
  return (
    <ul className="feature_list">
      {items.map((props) => (
        <FeatureItem {...props} />
      ))}
    </ul>
  );
};

const FeatureItem = ({ Icon, text }) => {
  return (
    <li className="feature_item">
      <div className="feature_icon_wrapper">
        <Icon className="feature_icon" />
      </div>
      <div className="feature_description">{text}</div>
    </li>
  );
};
