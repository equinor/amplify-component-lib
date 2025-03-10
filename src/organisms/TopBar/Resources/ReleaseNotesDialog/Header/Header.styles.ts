import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacings.medium};
`;

export { ButtonContainer, Wrapper };
