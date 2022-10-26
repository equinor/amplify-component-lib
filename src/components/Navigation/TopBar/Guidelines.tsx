import { forwardRef, ReactNode } from 'react';

import { Icon, SideSheet, Typography } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { elevation, spacings } = tokens;

const StyledSideSheet = styled(SideSheet)`
  padding: ${spacings.comfortable.medium};
  margin-top: 64px;
  height: calc(100vh - 64px);
  box-shadow: ${elevation.raised};
  overflow-y: auto;
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

export interface IGuidelineSections {
  sectionName: string;
  items: {
    title: string;
    icon: IconData;
    color: string;
    colorBox?: ReactNode;
  }[];
}

export interface IGuidelineProps {
  open: boolean;
  onClose: () => void;
  sections: IGuidelineSections[];
}

export const Guidelines = forwardRef<HTMLDivElement, IGuidelineProps>(
  ({ open, onClose, sections }, ref) => (
    <StyledSideSheet
      ref={ref}
      open={open}
      title="Icons Guide"
      onClose={onClose}
    >
      {sections.map((section, ind) => (
        <div key={ind} data-testid="guidelines-section">
          <Typography variant="overline">{section.sectionName}</Typography>
          <Guides>
            {section.items.map((item, index) => (
              <div key={index}>
                <Guide key={item.title}>
                  {item.colorBox && <StyledColorBox color={item.color} />}
                  <Icon data={item.icon} color={item.color} />
                  <Typography variant="caption">{item.title}</Typography>
                </Guide>
              </div>
            ))}
          </Guides>
        </div>
      ))}
    </StyledSideSheet>
  )
);
Guidelines.displayName = 'TopBar.Guidelines';
