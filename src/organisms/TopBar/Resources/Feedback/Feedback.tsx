import { FC } from 'react';

import { FeedbackContextProvider } from './providers/FeedbackContextProvider';
import { FeedbackType } from './Feedback.types';
import { FeedbackInner } from './FeedbackInner';

interface FeedbackProps {
  onClose: () => void;
  selectedType: FeedbackType;
}

export const Feedback: FC<FeedbackProps> = ({ onClose, selectedType }) => {
  return (
    <FeedbackContextProvider onClose={onClose} selectedType={selectedType}>
      <FeedbackInner />
    </FeedbackContextProvider>
  );
};
