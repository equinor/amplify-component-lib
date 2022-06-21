import { FC, ReactNode } from 'react';
import { Icon, SideSheet, Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
import { IconData } from '@equinor/eds-icons';

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

const Guidelines: FC<IGuidelineProps> = ({ open, onClose, sections }) => {
  return (
    /// <reference path="" />
    <StyledSideSheet open={open} title="Icons Guide" onClose={onClose}>
      {sections.map((section) => (
        <>
          <Typography variant="overline">{section.sectionName}</Typography>
          <Guides>
            {section.items.map((item) => (
              <>
                <Guide key={item.title}>
                  {item.colorBox && <StyledColorBox color={item.color} />}
                  <Icon data={item.icon} color={item.color} />
                  <Typography variant="caption">{item.title}</Typography>
                </Guide>
              </>
            ))}
          </Guides>
        </>
      ))}
    </StyledSideSheet>
  );
};

export default Guidelines;
