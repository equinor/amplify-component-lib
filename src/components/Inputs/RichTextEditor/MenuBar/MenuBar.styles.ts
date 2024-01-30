import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  > button:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
  > button:first-child {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  > button:last-child {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;
