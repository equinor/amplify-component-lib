import { ReactNode } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';

import { colors } from 'src/atoms/style';

export const renderContent = (content: IconData | ReactNode) => {
  if (content && typeof content === 'object' && 'prefix' in content) {
    return (
      <Icon data={content} color={colors.interactive.primary__resting.rgba} />
    );
  } else {
    return content;
  }
};
