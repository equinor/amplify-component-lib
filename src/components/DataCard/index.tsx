import React, { FC, ReactElement, RefObject, useEffect, useRef } from 'react';
import {
  Card as EDSCard,
  Icon,
  Tooltip,
  Typography,
} from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const { colors, elevation } = tokens;

interface CardProps {
  onClick?: React.MouseEventHandler;
}

const Card = styled(EDSCard)<CardProps>`
  box-shadow: ${elevation.raised};
  grid-gap: 0px;
  ${(props) => {
    if (props.onClick) {
      return `&:hover {
        box-shadow: ${elevation.overlay};
        cursor: pointer;
      }`;
    }
  }}
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 80% auto;
  overflow: hidden;
  height: 48px;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightContent = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  margin-left: -8px;
`;

const Title = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledIcon = styled(Icon)`
  margin-right: 12px;
`;

export interface DataCardProps {
  headerText: string;
  title: string;
  rightIcon?: IconData;
  rightElement?: ReactElement;
  body?: ReactElement;
  className?: string;
  onClick?: React.MouseEventHandler;
  onContextMenu?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ref: RefObject<HTMLDivElement>
  ) => void;
}

const DataCard: FC<DataCardProps> = ({
  headerText,
  title,
  rightIcon,
  rightElement,
  body,
  className,
  onClick,
  onContextMenu,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rightIcon && rightElement)
      throw Error('Only use one; rightIcon or rightElement');
  }, [rightIcon, rightElement]);

  return (
    <Card
      ref={ref}
      className={className ?? ''}
      onClick={onClick}
      data-testid="dataCard"
      onContextMenu={(event) =>
        onContextMenu ? onContextMenu(event, ref) : undefined
      }
    >
      <Header>
        <LeftContent>
          <Typography group="paragraph" variant="overline">
            {headerText}
          </Typography>
          <Tooltip title={title} placement="top">
            <Title variant="h6">{title}</Title>
          </Tooltip>
        </LeftContent>
        <RightContent>
          {rightIcon && (
            <StyledIcon
              data={rightIcon}
              size={24}
              color={colors.interactive.primary__resting.hex}
            />
          )}
          {rightElement && rightElement}
        </RightContent>
      </Header>
      {body && body}
    </Card>
  );
};

export default DataCard;
