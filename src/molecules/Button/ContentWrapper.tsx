import { Children, FC, ReactNode } from 'react';

import { spacings } from 'src/atoms/style';

import styled from 'styled-components';

export const Content = styled.span`
  display: inline-flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const TextContent = styled.span`
  padding: ${spacings.x_small};
`;

const FullWidthCenterContent = styled.span`
  text-align: center;
  flex: 1;
`;

const FullWidthInner = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  > :is(svg, img):first-child {
    margin-right: ${spacings.small};
  }

  > :is(svg, img):last-child {
    margin-left: ${spacings.small};
  }

  > :is(svg, img):only-child {
    margin-left: auto;
    margin-right: auto;
  }

  > span:first-child {
    margin-left: ${spacings.x_large};
  }

  > span:last-child {
    margin-right: ${spacings.x_large};
  }

  > span:only-child {
    margin-right: 0;
    margin-left: 0;
  }
`;

export const FullWidthContentWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const updatedChildren = Children.map(children, (child) =>
    typeof child !== 'object' ? (
      <FullWidthCenterContent>{child}</FullWidthCenterContent>
    ) : (
      child
    )
  );

  return <FullWidthInner>{updatedChildren}</FullWidthInner>;
};

export const ContentWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const updatedChildren = Children.map(children, (child) =>
    typeof child !== 'object' ? <TextContent>{child}</TextContent> : child
  );

  return <Content>{updatedChildren}</Content>;
};
