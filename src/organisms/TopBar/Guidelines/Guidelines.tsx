import { FC, isValidElement, useRef, useState } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

import { TopBarButton } from '../TopBar.styles';
import { TopBarMenu } from '../TopBarMenu';
import { Colorbox } from './Colorbox';
import { Item } from './Item';
import { Section } from './Section';
import { GuidelineItem } from 'src/atoms/types/Guidelines';

export interface GuidelineSections {
  sectionName: string;
  items: GuidelineItem[];
}

export interface GuidelineProps {
  sections: GuidelineSections[];
}

export const Guidelines: FC<GuidelineProps> = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <TopBarButton
        variant="ghost_icon"
        key="topbar-notifications"
        ref={buttonRef}
        onClick={handleButtonClick}
        data-testid="show-hide-button"
      >
        <Icon data={info_circle} />
      </TopBarButton>

      <TopBarMenu
        open={isOpen}
        anchorEl={buttonRef.current}
        onClose={handleButtonClick}
        withGap
      >
        {sections.map((section, index) => (
          <Section
            key={`section-${section.sectionName}`}
            title={section.sectionName}
          >
            {section.items.map((item, itemIndex) => {
              if (isValidElement(item)) return item;

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
};
Guidelines.displayName = 'TopBar.Guidelines';
