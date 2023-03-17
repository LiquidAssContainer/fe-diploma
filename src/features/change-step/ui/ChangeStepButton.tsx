import { FC, PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'components/Button';
import { setNextStep, setPrevStep } from 'entities/steps/model';

type ChangeStepButtonProps = PropsWithChildren & {
  type: 'prev' | 'next';
  onClick?: any;
};

export const StepButtonsContainer: FC<PropsWithChildren> = ({ children }) => (
  <div className="step-buttons__container">{children}</div>
);

export const PrevStepButton = ({ ...props }) => (
  <ChangeStepButton type="prev" {...props} />
);

export const NextStepButton = ({ ...props }) => (
  <ChangeStepButton type="next" {...props} />
);

export const ChangeStepButton: FC<ChangeStepButtonProps> = ({
  children,
  onClick,
  type = 'next',
  ...props
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(type === 'next' ? setNextStep() : setPrevStep());
    onClick?.();
  };

  return (
    <Button
      classname={`button__${type}-step`}
      onClick={handleClick}
      size="l"
      styleName="colored"
      {...props}
    >
      {children}
    </Button>
  );
};
