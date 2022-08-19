import './style.sass';

export const OrderBlockItem = ({ children }) => {
  return <div className="order__block_item">{children}</div>;
};

export const OrderBlockContainer = ({ children }) => {
  return <div className="order__block_container">{children}</div>;
};

export const OrderBlockHeader = ({ children }) => {
  return <div className="order__block_header">{children}</div>;
};

export const OrderBlockSection = ({ children }) => {
  return <div className="order__block_section">{children}</div>;
};
