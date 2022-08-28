import { OrderBlockContainer, OrderBlockHeaderTitle } from '../OrderBlock';
import { Icon } from '../TicketDetails/TicketDetails';
import { ReactComponent as PersonIcon } from 'assets/icons/person.svg';
import { Button } from 'components/Button';
import { Ticket } from 'components/Ticket';
import { NextStepButton } from '../OrderPage';

export const CheckStep = () => {
  return (
    <>
      <div>
        <OrderBlockContainer>
          <CheckStepHeader title="Поезд" />
          <Ticket isChecking />
        </OrderBlockContainer>

        <OrderBlockContainer>
          <CheckStepHeader title="Пассажиры" />
          <CheckStepSection>
            <CheckStepSectionMain>
              <ul className="check-step__passenger_list">
                {[1, 2, 3].map(() => (
                  <CheckStepSectionRow>
                    <CheckStepPassenger />
                  </CheckStepSectionRow>
                ))}
              </ul>
            </CheckStepSectionMain>
            <CheckStepSectionAside>
              <div className="check-step__sum">
                <span>Всего</span>
                <span className="check-step__sum_number">7 760</span>
                <span className="check-step__sum_currency">₽</span>
              </div>
              <Button size="s" style="transparent-dark">
                Изменить
              </Button>
            </CheckStepSectionAside>
          </CheckStepSection>
        </OrderBlockContainer>

        <OrderBlockContainer>
          <CheckStepHeader title="Способ оплаты" />
          <CheckStepSection>
            <CheckStepSectionMain>
              <CheckStepSectionRow>
                <div className="check-step__payment-method">Наличными</div>
              </CheckStepSectionRow>
            </CheckStepSectionMain>
            <CheckStepSectionAside>
              <Button size="s" style="transparent-dark">
                Изменить
              </Button>
            </CheckStepSectionAside>
          </CheckStepSection>
        </OrderBlockContainer>
      </div>

      <NextStepButton>Подтвердить</NextStepButton>
    </>
  );
};

const CheckStepHeader = ({ title }) => (
  <header className="check-step__header">
    <OrderBlockHeaderTitle title={title} />
  </header>
);

const CheckStepSection = ({ children }) => (
  <div className="check-step__section">{children}</div>
);

const CheckStepSectionRow = ({ children }) => (
  <div className="check-step__section_row">{children}</div>
);

const CheckStepSectionMain = ({ children }) => (
  <div className="check-step__section_main">{children}</div>
);

const CheckStepSectionAside = ({ children }) => (
  <div className="check-step__section_aside">{children}</div>
);

const CheckStepPassenger = ({
  ticketType,
  documentType,
  birthday,
  fullName,
  documentValue,
  gender,
}) => {
  return (
    <div className="check-step__passenger_item">
      <div className="passenger__type_container">
        <Icon wrapperClassName="passenger__icon" icon={PersonIcon} />
        <div className="passenger__type">Взрослый</div>
      </div>
      <div className="passenger__info">
        <div className="passenger__info_full-name">
          Мартынюк Ирина Эдуардовна
        </div>
        <CheckStepPassengerInfoUnit>Пол женский</CheckStepPassengerInfoUnit>
        <CheckStepPassengerInfoUnit>
          Дата рождения 17.02.1985
        </CheckStepPassengerInfoUnit>
        <CheckStepPassengerInfoUnit>
          Паспорт РФ 4204 380694
        </CheckStepPassengerInfoUnit>
      </div>
    </div>
  );
};

const CheckStepPassengerInfoUnit = ({ children }) => (
  <div className="passenger__info_unit">{children}</div>
);
