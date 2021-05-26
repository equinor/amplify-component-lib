import { FC } from "react";
import { Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import styled from "styled-components";

const { colors, spacings } = tokens;

const StyledWrapper = styled.div`
  display: flex;
  gap: ${spacings.comfortable.small};
  justify-content: start;
  flex-direction: row;
  padding-bottom: ${spacings.comfortable.small};
  border-bottom: 1px solid ${colors.interactive.disabled__border.hsla};
`;

const StyledText = styled(Typography)`
  margin-left: 8px;
`;

export type TextEntryProps = {
  body: string;
  onClick?: () => void;
};

const TextEntry: FC<TextEntryProps> = ({ body, onClick }) => {
  return (
    <StyledWrapper onClick={onClick}>
      <StyledText>{body}</StyledText>
    </StyledWrapper>
  );
};

export default TextEntry;
