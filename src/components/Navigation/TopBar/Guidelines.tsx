import React, { forwardRef, ReactNode } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { clear, IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { elevation, spacings, colors } = tokens;

const StyledSideSheet = styled.div`
  width: 320px;
  height: calc(100vh - 64px);
  background-color: ${colors.ui.background__default.hex};
  box-shadow: ${elevation.raised};
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 64px;
  z-index: 100;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${spacings.comfortable.medium};
  padding-right: ${spacings.comfortable.small};
  border-bottom: 1px solid ${colors.ui.background__medium.hex};
  padding-bottom: ${spacings.comfortable.small};
  padding-top: 8px;
`;

const Content = styled.div`
  padding: ${spacings.comfortable.medium};
`;

interface StyledColorBoxProps {
  color: string;
}
const StyledColorBox = styled.div<StyledColorBoxProps>`
  width: 52px;
  height: 32px;
  background-color: ${(props) => props.color};
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
  items: {
    title: string;
    icon: IconData;
    color: string;
    colorBox?: ReactNode;
  }[];
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
                {section.items.map((item, index) => (
                  <div key={index}>
                    <Guide key={item.title}>
                      {item.colorBox && (
                        <StyledColorBox
                          data-testid={`color-box-${item.title}`}
                          color={item.color}
                        />
                      )}
                      <Icon data={item.icon} color={item.color} size={24} />
                      <Typography variant="caption">{item.title}</Typography>
                    </Guide>
                  </div>
                ))}
              </Guides>
            </div>
          ))}
        </Content>
      </StyledSideSheet>
    );
  }
);
Guidelines.displayName = 'TopBar.Guidelines';
