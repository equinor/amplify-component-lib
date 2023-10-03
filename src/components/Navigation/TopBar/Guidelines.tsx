import React, { forwardRef } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { clear } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { GuidelineItem } from 'src/types/Guidelines';

import styled from 'styled-components';

const { elevation, spacings, colors } = tokens;

const StyledSideSheet = styled.div`
  width: 320px;
  height: calc(100vh - 64px);
  background-color: ${colors.ui.background__default.hex};
  box-shadow: ${elevation.raised};
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 64px;
  z-index: 100;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.ui.background__medium.hex};
  padding: ${spacings.comfortable.small} ${spacings.comfortable.small}
    ${spacings.comfortable.small} ${spacings.comfortable.medium};
`;

const Content = styled.div`
  height: calc(
    100vh - 64px - 57px
  ); // 64px is height of top bar, 57 is height of header in side sheet
  padding: ${spacings.comfortable.medium};
  overflow: auto;
`;

interface StyledColorBoxProps {
  $color: string;
}
const StyledColorBox = styled.div<StyledColorBoxProps>`
  width: 52px;
  height: 32px;
  background-color: ${(props) => props.$color};
  box-shadow: ${elevation.raised};
`;
const Guide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${spacings.comfortable.medium_small};
`;

const Guides = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${spacings.comfortable.large};
  margin-bottom: ${spacings.comfortable.xxx_large};
  gap: ${spacings.comfortable.medium};
  margin-left: ${spacings.comfortable.medium_small};
`;

export interface GuidelineSections {
  sectionName: string;
  items: GuidelineItem[];
}

export interface GuidelineProps {
  open: boolean;
  onClose: () => void;
  sections: GuidelineSections[];
}

export const Guidelines = forwardRef<HTMLDivElement, GuidelineProps>(
  ({ open, onClose, sections }, ref) => {
    if (!open) return null;
    return (
      <StyledSideSheet ref={ref}>
        <Header>
          <Typography group="ui" variant="accordion_header" as="span">
            Icons Guide
          </Typography>
          <Button
            variant="ghost_icon"
            onClick={onClose}
            data-testid="close-button"
          >
            <Icon data={clear} />
          </Button>
        </Header>
        <Content>
          {sections.map((section, ind) => (
            <div key={ind} data-testid="guidelines-section">
              <Typography variant="overline">{section.sectionName}</Typography>
              <Guides>
                {section.items.map((item, index) => {
                  if ('element' in item) {
                    return (
                      <div key={index}>
                        <Guide>
                          {item.element}
                          <Typography variant="caption">
                            {item.title}
                          </Typography>
                        </Guide>
                      </div>
                    );
                  }
                  return (
                    <div key={index}>
                      <Guide key={item.title}>
                        {item.colorBox && (
                          <StyledColorBox
                            data-testid={`color-box-${item.title}`}
                            $color={item.color}
                          />
                        )}
                        <Icon data={item.icon} color={item.color} size={24} />
                        <Typography variant="caption">{item.title}</Typography>
                      </Guide>
                    </div>
                  );
                })}
              </Guides>
            </div>
          ))}
        </Content>
      </StyledSideSheet>
    );
  }
);
Guidelines.displayName = 'TopBar.Guidelines';
