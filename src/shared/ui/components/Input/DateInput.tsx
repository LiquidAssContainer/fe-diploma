export const DateInput = ({
  name,
  size,
  startDate,
  endDate,
  onChangeDate,
  selected,
  ...props
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const onClick = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleInputChange = ({ target: { value } }) => {
    if (value) onChangeDate(name, value);
  };

  const handleDateSelect = (date) => {
    const formattedDate = formatDate(date);
    onChangeDate(name, formattedDate);
  };

  return (
    <div className="date-input__wrapper">
      <InputContainer size={size}>
        <Input
          name={name}
          size={size}
          type="date"
          min={startDate}
          max={endDate}
          onChange={handleInputChange}
          {...props}
        />
        <button
          className="input__btn input__btn_pick-date"
          onClick={onClick}
          type="button"
        >
          <CalendarIcon className="input__btn_icon" />
        </button>
      </InputContainer>

      {isPickerOpen && (
        <DatePicker
          onSelect={handleDateSelect}
          selected={parseDate(selected)}
          startDate={parseDate(startDate)}
          endDate={parseDate(endDate)}
          setIsOpen={setIsPickerOpen}
        />
      )}
    </div>
  );
};
