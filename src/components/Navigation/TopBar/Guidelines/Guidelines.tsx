import React, { forwardRef, ReactElement, useRef, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import Colorbox from './Colorbox';
import Item from './Item';
import Section from './Section';
import { TopBarButton } from 'src/components/Navigation/TopBar/TopBar.styles';
import TopBarMenu from 'src/components/Navigation/TopBar/TopBarMenu';
import { spacings } from 'src/style';
import { GuidelineItem } from 'src/types/Guidelines';

import styled from 'styled-components';

const { elevation, colors } = tokens;

const StyledSideSheet = styled.div`
  width: 320px;
  height: calc(100vh - 64px);
  background-color: ${colors.ui.background__default.rgba};
  box-shadow: ${elevation.raised};
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 64px;
  z-index: 100;
`;

const Content = styled.div`
  height: calc(
    100vh - 64px - 57px
  ); // 64px is height of top bar, 57 is height of header in side sheet
  padding: ${spacings.medium};
  overflow: auto;
`;

export interface GuidelineSections {
  sectionName: string;
  items: GuidelineItem[];
}

export interface GuidelineProps {
  /**
   * @deprecated Use Guideline.Section and Guideline.Item as children instead.
   */
  sections: GuidelineSections[];
  children?: ReactElement | ReactElement[];
}

export const Guidelines = forwardRef<HTMLDivElement, GuidelineProps>(
  ({ sections, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const buttonRef = useRef<HTMLDivElement | null>(null);

    const handleButtonClick = () => {
      if (isOpen) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    const onClose = () => {
      setIsOpen(false);
    };

    // if (!open) return null;
    return (
      <>
        <TopBarButton
          variant="ghost"
          key="topbar-notifications"
          ref={buttonRef}
          onClick={handleButtonClick}
          data-testid="show-hide-button"
          $isSelected={isOpen}
        >
          <Icon data={info_circle} />
        </TopBarButton>

        <TopBarMenu
          open={isOpen}
          anchorEl={buttonRef.current}
          onClose={onClose}
        >
          <div>
            {sections?.map((section, index) => (
              <Section
                key={`section-${section.sectionName}`}
                title={section.sectionName}
              >
                {section.items.map((item, itemIndex) => {
                  if ('element' in item) {
                    return (
                      <Item key={`${itemIndex}-${index}`} title={item.title}>
                        {item.element}
                      </Item>
                    );
                  }
                  return (
                    <Item key={`${itemIndex}-${index}`} title={item.title}>
                      {item.colorBox && (
                        <Colorbox
                          data-testid={`color-box-${item.title}`}
                          $color={item.color}
                        />
                      )}
                      <Icon data={item.icon} color={item.color} size={24} />
                    </Item>
                  );
                })}
              </Section>
            ))}
            {children}
          </div>
        </TopBarMenu>
      </>
    );
  }
);
Guidelines.displayName = 'TopBar.Guidelines';
