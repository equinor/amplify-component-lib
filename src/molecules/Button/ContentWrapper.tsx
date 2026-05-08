import { FC, Fragment, isValidElement, ReactNode } from 'react';

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

type Primitive = string | number;
const isPrimitive = (child: unknown): child is Primitive =>
  typeof child === 'string' || typeof child === 'number';

const flattenChildren = (children: ReactNode): ReactNode[] => {
  const result: ReactNode[] = [];

  const visit = (node: ReactNode) => {
    if (
      node === null ||
      node === undefined ||
      node === true ||
      node === false
    ) {
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (
      isValidElement<{ children?: ReactNode }>(node) &&
      node.type === Fragment
    ) {
      visit(node.props.children);
      return;
    }
    result.push(node);
  };

  visit(children);
  return result;
};

const coalesceChildren = (
  children: ReactNode,
  Wrapper: FC<{ children: ReactNode }>
): ReactNode[] => {
  const all = flattenChildren(children);
  const result: ReactNode[] = [];
  let buffer: Primitive[] = [];

  let primitiveGroupCount = 0;

  const flush = () => {
    if (buffer.length === 0) return;
    result.push(
      <Wrapper key={`primitive-${primitiveGroupCount++}`}>
        {buffer.join('')}
      </Wrapper>
    );
    buffer = [];
  };

  let elementCount = 0;

  all.forEach((child) => {
    if (isPrimitive(child)) {
      buffer.push(child);
    } else {
      flush();
      if (isValidElement(child) && child.key == null) {
        result.push(
          <Fragment key={`node-${elementCount++}`}>{child}</Fragment>
        );
      } else {
        elementCount++;
        result.push(child);
      }
    }
  });
  flush();

  return result;
};

export const FullWidthContentWrapper: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <FullWidthInner>
      {coalesceChildren(children, FullWidthCenterContent)}
    </FullWidthInner>
  );
};

export const ContentWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <Content>{coalesceChildren(children, TextContent)}</Content>;
};
