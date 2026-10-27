import React, { forwardRef, ReactElement } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { colors, spacings } from 'src/atoms/style';
import CopyText from 'src/molecules/InfoElement/CopyText';

import styled from 'styled-components';

const ContentRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${spacings.x_small};
`;

const Unit = styled(Typography)`
  color: ${colors.text.static_icons__tertiary.rgba};
`;

export interface InfoElementProps {
  title: string;
  content: string | ReactElement;
  capitalizeContent?: boolean;
  copyableContent?: boolean;
  unit?: string;
}

/**
 * @param title - String
 * @param content - String | ReactElement
 * @param copyableContent - Should the content be copyable via hover - Defaults to false (only works when content is string)
 * @param capitalizeContent - Should the content be capitalized - Defaults to false (only works when content is string)
 * @param unit - Unit shown after the value, styled differently from the value (only works when content is string)
 */
export const InfoElement = forwardRef<HTMLDivElement, InfoElementProps>(
  ({ title, content, copyableContent, capitalizeContent, unit }, ref) => {
    if (
      typeof content !== 'string' &&
      (copyableContent || capitalizeContent || unit)
    ) {
      throw new Error(
        'copyableContent, capitalizeContent and unit only work when content is string'
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

    const valueElement =
      copyableContent && typeof content === 'string' ? (
        <CopyText textToCopy={content}>{contentElement}</CopyText>
      ) : (
        contentElement
      );

    return (
      <div ref={ref}>
        <Typography group="paragraph" variant="overline">
          {title?.toUpperCase()}
        </Typography>
        {unit ? (
          <ContentRow>
            {valueElement}
            <Unit group="paragraph" variant="body_short">
              {unit}
            </Unit>
          </ContentRow>
        ) : (
          valueElement
        )}
      </div>
    );
  }
);

InfoElement.displayName = 'InfoElement';
