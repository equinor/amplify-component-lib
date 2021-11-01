import { Typography } from '@equinor/eds-core-react';
import React, { forwardRef, ReactElement } from 'react';

export interface InfoElementProps {
  title: string;
  content: ReactElement | string;
}

export const InfoElement = forwardRef<HTMLDivElement, InfoElementProps>(
  ({ title, content }, ref) => (
    <div ref={ref}>
      <Typography group="paragraph" variant="overline">
        {title?.toUpperCase()}
      </Typography>
      {typeof content === 'string' ? (
        <Typography variant="h6">{content}</Typography>
      ) : (
        content
      )}
    </div>
  )
);

InfoElement.displayName = 'InfoElement';
