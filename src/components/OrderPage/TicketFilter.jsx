import { DateInput } from '../Input';
import { ReactComponent as SecondClassIcon } from '../../assets/icons/second_class.svg';

export const TicketFilter = () => {
  const switchList = [
    { name: 'second_class', Icon: SecondClassIcon, label: 'Купе' },
    { name: 'third_class', Icon: SecondClassIcon, label: 'Плацкарт' },
    { name: 'fourth_class', Icon: SecondClassIcon, label: 'Сидячий' },
    { name: 'first_class', Icon: SecondClassIcon, label: 'Люкс' },
    { name: 'wifi', Icon: SecondClassIcon, label: 'Wi-Fi' },
    { name: 'express', Icon: SecondClassIcon, label: 'Экспресс' },
  ];

  return (
    <form action="" className="ticket-filter__form">
      <div className="ticket-filter__form_section">
        <label className="ticket-filter__form_label">
          <h4 className="footer_header">Дата поездки</h4>
          <DateInput />
        </label>
        <label className="ticket-filter__form_label">
          <h4 className="footer_header">Дата возвращения</h4>
          <DateInput />
        </label>
      </div>

      <div className="ticket-filter__form_section"></div>

      <div className="ticket-filter__form_section">
        <h4 className="footer_header">Стоимость</h4>
      </div>
    </form>
  );
};
