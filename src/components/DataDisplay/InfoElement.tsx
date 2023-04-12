import React, { forwardRef, ReactElement } from 'react';

import { Typography } from '@equinor/eds-core-react';

import CopyText from '../Inputs/CopyText';

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
  ) => {
    const contentElement =
      capitalizeContent && typeof content === 'string'
        ? content.toUpperCase()
        : content;
    return (
      <div ref={ref}>
        <Typography group="paragraph" variant="overline">
          {title?.toUpperCase()}
        </Typography>
        {typeof content === 'string' ? (
          copyableContent ? (
            <CopyText iconRightPos={copyIconRightPos} textToCopy={content}>
              <Typography variant="h6">{contentElement}</Typography>
            </CopyText>
          ) : (
            <Typography variant="h6" capitalize={capitalizeContent}>
              {contentElement}
            </Typography>
          )
        ) : (
          content
        )}
      </div>
    );
  }
);

InfoElement.displayName = 'InfoElement';
export default InfoElement;
