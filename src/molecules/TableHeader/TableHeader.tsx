import { FC, MouseEvent, MouseEventHandler } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { IconData, swap_vertical } from '@equinor/eds-icons';

import { SpacingsMode } from 'src/atoms';
import { Variants } from 'src/atoms/types/variants';
import { Button } from 'src/molecules/Button/Button';
import {
  ActionsWrapper,
  Container,
  Wrapper,
} from 'src/molecules/TableHeader/TableHeader.styles';
import {
  getActionIconColor,
  getLeadingIcon,
  getLeadingIconColor,
  getTextColor,
} from 'src/molecules/TableHeader/TableHeader.utils';

export interface TableHeaderProps {
  as?: 'th' | 'div';
  variant?: Extract<Variants, 'error' | 'warning'>;
  onClick?: MouseEventHandler;
  leadingIcon?: IconData;
  trailingAction?: {
    icon: IconData;
    onClick: () => void;
  };
  sorting?: {
    isSorting?: boolean;
    onSortClick?: MouseEventHandler;
  };
  children: string;
}

/**
 * @param as - HTML element to render as
 * @param variant - Form variant (error, warning)
 * @param onClick - Click handler for the cell
 * @param leadingIcon - Icon to display before the text, only has defaults when a variant has been set
 * @param trailingAction - Button with icon after text, but before sort icon
 * @param sorting - If the sorting should be enabled, { isSorting, onSortClick } where isSorting determines if the sort icon is shown and onSortClick is the click handler for sorting
 * @param children - Text content of the header cell
 */
export const TableHeader: FC<TableHeaderProps> = ({
  as = 'th',
  variant,
  onClick,
  sorting,
  leadingIcon,
  trailingAction,
  children,
}) => {
  const usingLeadingIcon = getLeadingIcon({
    variant,
    leadingIcon,
  });

  const handleOnContainerClick = (event: MouseEvent) => {
    if (onClick) onClick(event);
    else sorting?.onSortClick?.(event);
  };

  return (
    <Wrapper as={as}>
      <Container
        $hasOnClick={!!onClick}
        $hasOnSort={!!sorting?.isSorting}
        $variant={variant}
        onClick={handleOnContainerClick}
      >
        {usingLeadingIcon && (
          <Icon
            data={usingLeadingIcon}
            color={getLeadingIconColor({
              variant,
              onClick,
            })}
          />
        )}
        <Typography
          variant="cell_header"
          group="table"
          color={getTextColor({
            variant,
            onClick,
          })}
        >
          {children}
        </Typography>
        {(!!trailingAction || !!sorting) && (
          <ActionsWrapper>
            {trailingAction && (
              <Button
                data-spacings-mode={SpacingsMode.COMPACT}
                variant="ghost_icon"
                onClick={trailingAction.onClick}
              >
                <Icon
                  data={trailingAction.icon}
                  color={getActionIconColor({
                    variant,
                  })}
                />
              </Button>
            )}
            {sorting?.isSorting && (
              <Button
                className="sort-button"
                onClick={onClick ? sorting.onSortClick : undefined}
                data-spacings-mode={SpacingsMode.COMPACT}
                variant="ghost_icon"
              >
                <Icon
                  data={swap_vertical}
                  color={getActionIconColor({
                    variant,
                  })}
                />
              </Button>
            )}
          </ActionsWrapper>
        )}
      </Container>
    </Wrapper>
  );
};
