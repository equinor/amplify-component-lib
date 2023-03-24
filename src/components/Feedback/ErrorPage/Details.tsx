import { forwardRef, useState } from 'react';

import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';
const { spacings, colors } = tokens;

type DetailsContainerProps = { open: boolean };

const Container = styled.div<DetailsContainerProps>`
  display: flex;
  flex-direction: column;
  width: 400px;
  > div:first-child {
    border-bottom: ${(props) =>
      !props.open && `1px solid ${colors.ui.background__medium.hex}`};
    > p {
      color: ${(props) =>
        props.open
          ? colors.interactive.primary__resting.hex
          : colors.text.static_icons__default.hex};
    }
    > button > span > svg {
      fill: ${(props) =>
        props.open
          ? colors.interactive.primary__resting.hex
          : colors.text.static_icons__default.hex};
    }
  }
  > p {
    padding: 0 ${spacings.comfortable.large};
    text-align: justify;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${spacings.comfortable.medium};
`;

type DetailsProps = {
  text?: string;
};
export const Details = forwardRef<HTMLDivElement, DetailsProps>(
  ({ text }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <Container ref={ref} open={show}>
        <Header>
          <Typography>More details</Typography>
          <Button
            variant="ghost_icon"
            onClick={() => setShow(!show)}
            data-testid="show-details"
          >
            <Icon data={show ? chevron_up : chevron_down} />
          </Button>
        </Header>
        {show && (
          <Typography
            group="paragraph"
            variant="body_long"
            data-testid="details-text"
          >
            {text}
          </Typography>
        )}
      </Container>
    );
  }
);

Details.displayName = 'ErrorPage.Details';
