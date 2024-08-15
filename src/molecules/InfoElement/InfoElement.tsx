import React, { forwardRef, ReactElement } from 'react';

import { Typography } from 'src/molecules';
import CopyText from 'src/molecules/InfoElement/CopyText';

export interface InfoElementProps {
  title: string;
}

/**
 * @param content - Text
 * @param copyableContent - Should the content be copyable via hover - Defaults to false
 * @param capitalizeContent - Should the content be capitalized - Defaults to false
 */
interface TextInfoElementProps extends InfoElementProps {
  content: string;
  copyableContent?: boolean;
  capitalizeContent?: boolean;
}

interface CustomInfoElementProps extends InfoElementProps {
  content: ReactElement;
  copyableContent?: false;
  capitalizeContent?: false;
}

export const InfoElement = forwardRef<
  HTMLDivElement,
  TextInfoElementProps | CustomInfoElementProps
>(({ title, content, copyableContent, capitalizeContent }, ref) => {
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
      {copyableContent ? (
        <CopyText textToCopy={content}>{contentElement}</CopyText>
      ) : (
        contentElement
      )}
    </div>
  );
});

InfoElement.displayName = 'InfoElement';
