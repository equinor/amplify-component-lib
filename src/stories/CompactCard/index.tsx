import { Card as EDSCard, Icon, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { IconData } from '@equinor/eds-icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const { elevation, spacings } = tokens;

const Card = styled(EDSCard)<CardProps>`
  box-shadow: ${elevation.none};
  transition: box-shadow 100ms;
  min-width: 200px;
  grid-gap: 0px;
  ${(props) => {
    if (props.onClick) {
      return `&:hover {
        box-shadow: ${elevation.raised};
        cursor: pointer;
      }`;
    }
  }}
`;

const Header = styled(Card.Header)`
  display: grid;
  grid-template-columns: 80% 20%;

  & > :not(:first-child) {
    margin-left: 0 !important;
    padding: ${spacings.comfortable.small};
  }
`;

const Title = styled(Typography)`
  text-overflow: ellipsis;
  max-width: fit-content;
  overflow: hidden;
  white-space: nowrap;
`;

interface CardProps {
  onClick?: React.MouseEventHandler;
}

export interface CompactCardProps {
  headerText: string;
  name: string;
  headerRightElement?: ReactElement;
  rightIcon?: IconData;
  className?: string;
  onClick?: React.MouseEventHandler;
}

const CompactCard: React.FC<CompactCardProps> = ({
  headerText,
  name,
  headerRightElement,
  rightIcon,
  className,
  onClick,
}) => {
  const handleOnCardClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLButtonElement) {
      // Clicked settings menu
    } else if (onClick) {
      // Clicked card
      onClick(e);
    }
  };

  return (
    <Card className={className} onClick={handleOnCardClick}>
      <Header>
        <Card.HeaderTitle>
          <Title group="paragraph" variant="overline">
            {headerText}
          </Title>
          <Title variant="h6">{name}</Title>
        </Card.HeaderTitle>
        {rightIcon && <Icon data={rightIcon} size={40} />}
        {headerRightElement && headerRightElement}
      </Header>
    </Card>
  );
};

export default CompactCard;
