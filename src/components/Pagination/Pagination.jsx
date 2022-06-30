import './style.sass';

import { ReactComponent as ChevronIcon } from 'assets/icons/chevron.svg';

export const Pagination = () => {
  return (
    <ul className="pagination__container">
      <div className="pagination__element">
        <ChevronIcon className="pagination__element_chevron" />
      </div>
      <div className="pagination__element pagination__element_selected">1</div>
      <div className="pagination__element">2</div>
      <div className="pagination__element">3</div>
      <div className="pagination__element">
        <ChevronIcon className="pagination__element_chevron arrow_left" />
      </div>
    </ul>
  );
};
