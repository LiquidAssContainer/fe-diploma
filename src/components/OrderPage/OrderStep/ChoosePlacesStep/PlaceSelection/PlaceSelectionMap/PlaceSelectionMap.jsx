import { useSelector } from 'react-redux';
import {
  FirstClassPlaces,
  FourthClassPlaces,
  SecondClassPlaces,
  ThirdClassPlaces,
} from './Places';

const railcarFrontImg = require('assets/railcar_front_side.png');
const railcarBackImg = require('assets/railcar_back_side.png');

export const PlaceSelectionMap = ({ seats, railcarClass }) => {
  // const { seatsInfo, selectedRailcarClass } = useSelector(
  //   (state) => state.seats,
  // );
  // const { seats } = seatsInfo[selectedRailcarClass];

  return (
    <div className="places__selection-map">
      <div className="places__railcar-side">
        {/* нигде в данных не вижу номеров вагона в виде цифр */}
        <div className="places__railcar-side_number">00</div>
        <img className="places__railcar-side_img" src={railcarFrontImg} />
      </div>
      {(() => {
        switch (railcarClass) {
          case 'fourth':
            return <FourthClassPlaces />;
          case 'third':
            return <ThirdClassPlaces />;
          case 'second':
            return <SecondClassPlaces />;
          case 'first':
            return <FirstClassPlaces />;
        }
      })()}
      <div className="places__railcar-side">
        <img className="places__railcar-side_img" src={railcarBackImg} />
      </div>
    </div>
  );
};
