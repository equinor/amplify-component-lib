import { FC } from 'react';

import { WorkItemType } from '@equinor/subsurface-app-management';

import { FeedbackContextProvider } from './providers/FeedbackContextProvider';
import { FeedbackInner } from './FeedbackInner';

interface FeedbackProps {
  onClose: () => void;
  selectedType: WorkItemType;
}

export const Feedback: FC<FeedbackProps> = ({ onClose, selectedType }) => {
  return (
    <FeedbackContextProvider onClose={onClose} selectedType={selectedType}>
      <FeedbackInner />
    </FeedbackContextProvider>
  );
};
