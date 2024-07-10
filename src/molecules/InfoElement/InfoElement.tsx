import React, { forwardRef, ReactElement } from 'react';

import { Typography } from '@equinor/eds-core-react';

import CopyText from 'src/molecules/InfoElement/CopyText';

export interface InfoElementProps {
  title: string;
  content: ReactElement | string;
  capitalizeContent?: boolean;
  /* @deprecated This prop will be removed when CopyText gets removed */
  copyableContent?: boolean;
}

export const InfoElement = forwardRef<HTMLDivElement, InfoElementProps>(
  ({ title, content, copyableContent, capitalizeContent }, ref) => {
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
            <CopyText textToCopy={content}>
              <Typography variant="h6">{contentElement}</Typography>
            </CopyText>
          ) : (
            <Typography variant="h6">{contentElement}</Typography>
          )
        ) : (
          content
        )}
      </div>
    );
  }
);

InfoElement.displayName = 'InfoElement';
