import './style.sass';

import cn from 'classnames';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';

import { ReactComponent as ShrinkBtnIcon } from 'assets/icons/shrink.svg';
import { ReactComponent as ExpandBtnIcon } from 'assets/icons/expand.svg';
import { Icon } from 'shared/ui/components/Icon';

type SidebarComponent = FC<PropsWithChildren> & {
  Header: typeof SidebarHeader;
  Section: typeof SidebarSection;
};

type SidebarHeaderProps = PropsWithChildren & {
  asideSlot: ReactNode;
  iconSlot: ReactNode;
  className?: string;
};

type SidebarSectionProps = PropsWithChildren & {
  headerSlot: ReactNode;
  isExpandable?: boolean;
};

const Sidebar: SidebarComponent = ({ children }) => {
  return <div className="ticket-details__container">{children}</div>;
};

export const SidebarHeader: FC<SidebarHeaderProps> = ({
  children,
  asideSlot,
  iconSlot,
  className = '',
}) => {
  return (
    <header className="ticket-details__section_header">
      {iconSlot}
      <h4 className={cn('header_size_s', className)}>
        {children}
        {asideSlot}
      </h4>
    </header>
  );
};

export const SidebarSection: FC<SidebarSectionProps> = ({
  children,
  headerSlot,
  isExpandable,
}) => {
  const [isExpanded, setIsExpanded] = useState(!isExpandable);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="ticket-details__section">
      {isExpandable && (
        <button
          className="ticket-details__button_expand"
          type="button"
          onClick={handleClick}
        >
          <Icon
            wrapperClassName="button_expand_icon"
            iconClassName={isExpanded ? 'icon__grey' : ''}
            icon={isExpanded ? ShrinkBtnIcon : ExpandBtnIcon}
          />
        </button>
      )}
      {headerSlot}
      {isExpanded ? (
        <div className="ticket-details__section_content">{children}</div>
      ) : null}
    </div>
  );
};

// export const SidebarSectionContent = ({ children }) => {
//   return <div className="ticket-details__section_content">{children}</div>;
// };

Sidebar.Header = SidebarHeader;
Sidebar.Section = SidebarSection;

export { Sidebar };
