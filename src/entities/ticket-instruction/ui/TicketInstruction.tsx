import { FC, PropsWithChildren } from 'react';
import { IconComponent } from 'shared/ui/components/Icon';

type TicketInstructionProps = PropsWithChildren & {
  icon: IconComponent;
};

export const TicketInstruction: FC<TicketInstructionProps> = ({
  children,
  icon: Icon,
}) => {
  return (
    <li className="ticket-steps__item">
      <div className="ticket-step__icon_wrapper">
        <Icon className="ticket-step__icon" />
      </div>
      <div className="ticket-step__text">{children}</div>
    </li>
  );
};
