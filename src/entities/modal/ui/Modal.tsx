import './style.sass';

import cn from 'classnames';
import { FC, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components/Button';
import { Icon } from 'components/OrderPage/TicketDetails/TicketDetails';

import { ReactComponent as InfoIcon } from './icons/info.svg';
import { ReactComponent as WarningIcon } from './icons/warning.svg';

import { useDisableBodyScroll } from 'hooks/useDisableBodyScroll';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useOnKeyDown } from 'hooks/useOnKeyDown';
import { modalModel } from '..';

type ModalProps = {
  onClose: any;
  isOpen: boolean;
  type: 'info' | 'error';
  message: string;
  description?: string | null;
};

export const Modal: FC = (
  {
    // onClose,
    // isOpen,
    // type = 'info',
    // message,
    // description = null,
  },
) => {
  const dispatch = useDispatch();
  const { isOpen, type, message, description } = useSelector(
    (state: RootState) => state.modal,
  );

  const ref = useRef();

  const handleClose = () => {
    dispatch(modalModel.closeModal());
  };

  useDisableBodyScroll(isOpen);
  useOnClickOutside(ref, handleClose);
  useOnKeyDown('Escape', handleClose);

  return isOpen
    ? createPortal(
        <div className="modal__wrapper">
          <div className={cn('modal', `modal_type_${type}`)} ref={ref as any}>
            <div className="modal__header">
              <Icon
                wrapperClassName={cn('modal__icon', `modal__icon_${type}`)}
                icon={type === 'info' ? InfoIcon : WarningIcon}
              />
            </div>

            <div className="modal__content">
              <p className="modal__content_message">{message}</p>
              {description && (
                <p className="modal__content_description">{description}</p>
              )}
            </div>

            <div className="modal__footer">
              <Button
                classname="modal__button"
                size="m"
                styleName="transparent-dark"
                onClick={handleClose}
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
