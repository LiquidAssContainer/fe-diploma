import './style.sass';

import cn from 'classnames';
import { createPortal } from 'react-dom';

import { Button } from 'components/Button';
import { Icon } from 'components/OrderPage/TicketDetails/TicketDetails';
import { ReactComponent as InfoIcon } from 'assets/icons/info_icon.svg';
import { ReactComponent as WarningIcon } from 'assets/icons/warning_icon.svg';

import { useRef } from 'react';
import { useDisableBodyScroll } from 'hooks/useDisableBodyScroll';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useOnKeyDown } from 'hooks/useOnKeyDown';

export const Modal = ({
  handleClose,
  isOpen,
  type = 'info',
  message,
  description,
}) => {
  const ref = useRef();

  const onClose = () => {
    handleClose();
  };

  useDisableBodyScroll(isOpen);
  useOnClickOutside(ref, onClose);
  useOnKeyDown('Escape', onClose);

  return isOpen
    ? createPortal(
        <div className="modal__wrapper">
          <div className={cn('modal', `modal_type_${type}`)} ref={ref}>
            <div className="modal__header">
              <Icon
                wrapperClassName={cn('modal__icon', `modal__icon_${type}`)}
                icon={type === 'info' ? InfoIcon : WarningIcon}
              />
            </div>
            <div className="modal__content">
              <p className="modal__content_message">
                Таким образом консультация с широким активом в значительной
                степени обуславливает создание модели развития.
              </p>
              <p className="modal__content_description">
                Повседневная практика показывает, что сложившаяся структура
                организации играет важную роль в формировании существенных
                финансовых и административных.
              </p>
            </div>
            <div className="modal__footer">
              <Button
                classname="modal__button"
                size="m"
                style="transparent-dark"
                onClick={onClose}
              >
                Понятно
              </Button>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
};
