import React, { forwardRef, ReactElement } from 'react';

import { Typography } from '@equinor/eds-core-react';

import CopyText from 'src/molecules/InfoElement/CopyText';

export interface InfoElementProps {
  title: string;
  content: string | ReactElement;
  capitalizeContent?: boolean;
  copyableContent?: boolean;
}

/**
 * @param title - String
 * @param content - String | ReactElement
 * @param copyableContent - Should the content be copyable via hover - Defaults to false (only works when content is string)
 * @param capitalizeContent - Should the content be capitalized - Defaults to false (only works when content is string)
 */
export const InfoElement = forwardRef<HTMLDivElement, InfoElementProps>(
  ({ title, content, copyableContent, capitalizeContent }, ref) => {
    if (typeof content !== 'string' && (copyableContent || capitalizeContent)) {
      throw new Error(
        'copyableContent and capitalizeContent only works when content is string'
      );
    }

    const contentElement =
      typeof content === 'string' ? (
        <Typography variant="h6">
          {capitalizeContent ? content.toUpperCase() : content}
        </Typography>
      ) : (
        content
      );

    return (
      <div ref={ref}>
        <Typography group="paragraph" variant="overline">
          {title?.toUpperCase()}
        </Typography>
        {copyableContent && typeof content === 'string' ? (
          <CopyText textToCopy={content}>{contentElement}</CopyText>
        ) : (
          contentElement
        )}
      </div>
    );
  }
);

InfoElement.displayName = 'InfoElement';
