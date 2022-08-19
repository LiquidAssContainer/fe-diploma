import {
  FirstClassPlaces,
  FourthClassPlaces,
  SecondClassPlaces,
  ThirdClassPlaces,
} from './Places';

const railcarFrontImg = require('assets/railcar_front_side.png');
const railcarBackImg = require('assets/railcar_back_side.png');

export const PlaceSelectionMap = ({ railcarClass }) => {
  return (
    <div className="places__selection-map">
      <div className="places__railcar-side">
        <div className="places__railcar-side_number">22</div>
        <img className="places__railcar-side_img" src={railcarFrontImg} />
      </div>
      {(() => {
        switch (railcarClass) {
          case 'fourth_class':
            return <FourthClassPlaces />;
          case 'third_class':
            return <ThirdClassPlaces />;
          case 'second_class':
            return <SecondClassPlaces />;
          case 'first_class':
            return <FirstClassPlaces />;
        }
      })()}
      <div className="places__railcar-side">
        <img className="places__railcar-side_img" src={railcarBackImg} />
      </div>
    </div>
  );
};
