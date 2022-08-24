import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const RangeSlider = () => {
  return (
    <div className="range-slider">
      <div className="range-slider__from-and-to">
        <div className="range-slider__from-and-to_item">от</div>
        <div className="range-slider__from-and-to_item">до</div>
      </div>
      <Slider
        min={1920}
        max={6000}
        range
        trackStyle={{
          backgroundColor: '#FFA800',
          height: 19,
        }}
        handleStyle={{
          borderColor: 'fff',
          height: 24,
          width: 24,
          backgroundColor: 'fff',
          border: 'none',
          opacity: 1,
          marginTop: -2.5,
        }}
        railStyle={{
          backgroundColor: '#3E3C41',
          height: 19,
          borderRadius: 8,
          border: '1px solid #C4C4C4',
          // paddingInline: 40,
        }}
        marks={{
          1920: {
            label: 'Шилов',
            style: {
              transform: 'translateY(100%)',
              fontSize: 16,
              color: '#E5E5E5',
            },
          },
          4500: `4500`,
          6000: {
            label: 7000,
            style: {
              transform: 'translateY(100%), translateX(100%)',
              fontSize: 16,
              color: '#E5E5E5',
            },
          },
        }}
        tipFormatter={(value) => <span className="tooltip">{value}€</span>}
        dotStyle={{ display: 'none' }}
        // markStyle={{color: 'red'}}
      />
    </div>
  );
};
