import 'react-day-picker/dist/style.css';
import './style.sass';

import { DayPicker, useNavigation } from 'react-day-picker';
import { format, addMonths } from 'date-fns';
import ru from 'date-fns/locale/ru';

const locale = ru;

const DatePickerCaption = ({ displayMonth, locale }) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  return (
    <header className="rdp-caption_custom">
      <button
        className="rdp-nav_button_custom rdp-nav_button_custom_previous"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        type="button"
      />
      <h2 className="rdp-caption_label_custom">
        {format(displayMonth, 'LLLL', { locale })}
      </h2>
      <button
        className="rdp-nav_button_custom rdp-nav_button_custom_next"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        type="button"
      />
    </header>
  );
};

export const DatePicker = ({ onSelectDate, startDate, endDate, selected }) => {
  // const onSelect = (date) => {
  //   onSelectDate(date);
  // };

  return (
    <DayPicker
      mode="single"
      selected={selected}
      showOutsideDays
      hideHead
      locale={locale}
      onSelect={onSelectDate}
      disabled={[
        { before: startDate || new Date() },
        { after: endDate || addMonths(new Date(), 11) },
      ]}
      defaultMonth={selected || startDate || endDate}
      fromMonth={new Date()}
      toMonth={addMonths(new Date(), 11)}
      components={{
        Caption: (props) => <DatePickerCaption {...props} locale={locale} />,
      }}
    />
  );
};
