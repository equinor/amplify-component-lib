import { StarProgress } from "@equinor/eds-core-react";
import { Backdrop } from "@material-ui/core";
import styled from "styled-components";

const StyledBackdrop = styled(Backdrop)`
  z-index: 300;
  background-color: rgba(255, 255, 255, 0.4);
`;

const FullPageSpinner = () => {
  return (
    <StyledBackdrop open={true}>
      <StarProgress />
    </StyledBackdrop>
  );
};

export default FullPageSpinner;
