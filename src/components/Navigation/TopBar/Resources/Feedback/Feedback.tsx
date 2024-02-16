import { FC } from 'react';

import FeedbackContextProvider from './providers/FeedbackContextProvider';
import { FeedbackType } from './Feedback.types';
import FeedbackInner from './FeedbackInner';

interface FeedbackProps {
  onClose: () => void;
  selectedType: FeedbackType;
  field?: string;
}

const Feedback: FC<FeedbackProps> = ({ field, onClose, selectedType }) => {
  return (
    <FeedbackContextProvider
      field={field}
      onClose={onClose}
      selectedType={selectedType}
    >
      <FeedbackInner />
    </FeedbackContextProvider>
  );
};

export default Feedback;
