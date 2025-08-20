import { forwardRef } from 'react';

import { Tooltip as EDSTooltip, TooltipProps } from '@equinor/eds-core-react';

import styled from 'styled-components';

export type OptionalTooltipProps = {
  textTransform?: string;
} & TooltipProps;

const Tooltip = styled(EDSTooltip)<OptionalTooltipProps>`
  color: white;
  text-transform: ${(props) => props.textTransform};
`;

export const OptionalTooltip = forwardRef<HTMLDivElement, OptionalTooltipProps>(
  ({ title, children, ...rest }, ref) => {
    if (title === undefined) {
      return <>{children}</>;
    }

    // Added extra div around children to allow tooltip to work on disabled elements (i.e. Button, TextField ++)
    return (
      <Tooltip ref={ref} title={title} {...rest}>
        <div>{children}</div>
      </Tooltip>
    );
  }
);

OptionalTooltip.displayName = 'OptionalTooltip';
