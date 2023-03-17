import { FC } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const steps = [
  { number: 1, name: 'tickets', label: 'Билеты' },
  { number: 2, name: 'passengers', label: 'Пассажиры' },
  { number: 3, name: 'payment', label: 'Оплата' },
  { number: 4, name: 'check', label: 'Проверка' },
];

type StepperProps = {
  innerRef: any;
};

type StepProps = {
  label: string;
  isColored: boolean;
  i: number;
};

export const Stepper: FC<StepperProps> = ({ innerRef }) => {
  const { step: activeStep } = useSelector((state: RootState) => state.steps);

  const activeStepIndex = steps.findIndex((step) => step.number === activeStep);

  return (
    <div ref={innerRef} className="steps__list_wrapper">
      <ul className="steps__list">
        {steps.map((step, i) => {
          return (
            <Step key={i} i={i} isColored={i <= activeStepIndex} {...step} />
          );
        })}
      </ul>
    </div>
  );
};

const Step: FC<StepProps> = ({ label, isColored, i }) => (
  <li className={cn('step__item', { step__item_colored: isColored })}>
    <div className="steps__item_number">{i + 1}</div>
    <div className="steps__item_label">{label}</div>
  </li>
);
