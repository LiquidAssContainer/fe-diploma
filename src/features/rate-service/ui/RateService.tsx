import cn from 'classnames';
import { FC, useState } from 'react';

import { ReactComponent as StarIcon } from './icons/star.svg';
import './styles.sass';

export const RateService: FC = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (rating: number) => {
    setRating(rating);
  };

  return (
    <div className="rate-service">
      <div className="rate-service__label">Оценить сервис</div>
      <ul className="rate-service__stars">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            className="star__wrapper"
            onClick={() => handleClick(i + 1)}
          >
            <StarIcon className={cn('star', { filled: rating > i })} />
          </button>
        ))}
      </ul>
    </div>
  );
};
