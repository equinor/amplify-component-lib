import React, { forwardRef, useRef, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

import Colorbox from './Colorbox';
import Item from './Item';
import Section from './Section';
import { TopBarButton } from 'src/components/Navigation/TopBar/TopBar.styles';
import TopBarMenu from 'src/components/Navigation/TopBar/TopBarMenu';
import { GuidelineItem } from 'src/types/Guidelines';

export interface GuidelineSections {
  sectionName: string;
  items: GuidelineItem[];
}

export interface GuidelineProps {
  sections: GuidelineSections[];
}

export const Guidelines = forwardRef<HTMLDivElement, GuidelineProps>(
  ({ sections }) => {
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
          withGap
        >
          {sections.map((section, index) => (
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
        </TopBarMenu>
      </>
    );
  }
);
Guidelines.displayName = 'TopBar.Guidelines';
