import { Typography as EDSTypography } from '@equinor/eds-core-react';
import React, { forwardRef, ReactElement } from 'react';
import styled from 'styled-components';
import CopyText from '../CopyText';

interface TypographyProps {
  capitalize?: boolean;
}

const Typography = styled(EDSTypography)<TypographyProps>`
  ${(props) => props.capitalize && 'text-transform: capitalize;'}
`;

export interface InfoElementProps {
  title: string;
  content: ReactElement | string;
  capitalizeContent?: boolean;
  copyableContent?: boolean;
  copyIconRightPos?: string;
}

const InfoElement = forwardRef<HTMLDivElement, InfoElementProps>(
  (
    { title, content, copyableContent, capitalizeContent, copyIconRightPos },
    ref
  ) => (
    <div ref={ref}>
      <Typography group="paragraph" variant="overline">
        {title?.toUpperCase()}
      </Typography>
      {typeof content === 'string' ? (
        copyableContent ? (
          <CopyText iconRightPos={copyIconRightPos} textToCopy={content}>
            <Typography variant="h6" capitalize={capitalizeContent}>
              {content}
            </Typography>
          </CopyText>
        ) : (
          <Typography variant="h6" capitalize={capitalizeContent}>
            {content}
          </Typography>
        )
      ) : (
        content
      )}
    </div>
  )
);

InfoElement.displayName = 'InfoElement';
export default InfoElement;
