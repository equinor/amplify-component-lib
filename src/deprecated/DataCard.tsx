import { forwardRef, MouseEvent, MouseEventHandler, ReactElement } from 'react';

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

import { spacings } from 'src/atoms/style';

const Card = styled(EDSCard)`
  box-shadow: ${elevation.raised};
  grid-gap: 0;
  padding: ${spacings.medium};
  transition: box-shadow 400ms;
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
`;

const HeaderText = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Title = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface DataCardProps {
  headerText: string;
  title: string;
  tooltipOnTitle?: boolean;
  rightIcon?: IconData;
  rightElement?: ReactElement;
  body?: ReactElement;
  className?: string;
  onClick?: MouseEventHandler;
  onContextMenu?: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * @deprecated Being deprecated from amplify-component-lib move into app if you want the implementation
 */

const DataCard = forwardRef<HTMLDivElement, DataCardProps>(
  (
    {
      headerText,
      title,
      tooltipOnTitle = false,
      rightIcon,
      rightElement,
      body,
      className,
      onClick,
      onContextMenu,
    },
    ref
  ) => {
    if (rightIcon && rightElement) {
      throw new Error('Only use one; rightIcon or rightElement');
    }

    const handleOnContextMenu: MouseEventHandler<HTMLDivElement> = (event) => {
      onContextMenu?.(event);
    };

    return (
      <Card
        ref={ref}
        className={className ?? ''}
        onClick={onClick}
        data-testid="dataCard"
        onContextMenu={handleOnContextMenu}
      >
        <Header>
          <LeftContent>
            <HeaderText group="paragraph" variant="overline">
              {headerText}
            </HeaderText>
            {tooltipOnTitle ? (
              <Tooltip title={title} placement="top">
                <Title variant="h6">{title}</Title>
              </Tooltip>
            ) : (
              <Title variant="h6">{title}</Title>
            )}
          </LeftContent>
          <RightContent>
            {rightIcon && (
              <Icon
                data={rightIcon}
                size={24}
                color={colors.interactive.primary__resting.rgba}
              />
            )}
            {rightElement && rightElement}
          </RightContent>
        </Header>
        {body && body}
      </Card>
    );
  }
);

DataCard.displayName = 'DataCard';

export default DataCard;
