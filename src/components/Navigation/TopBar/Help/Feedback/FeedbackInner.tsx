import { FC } from 'react';

import FeedbackForm from './FeedbackForm/FeedbackForm';
import { useFeedbackContext } from './hooks/useFeedbackContext';
import ResponsePage from './ResponsePage/ResponsePage';

interface FeedbackInnerProps {}

const FeedbackInner: FC<FeedbackInnerProps> = () => {
  const { showResponsePage } = useFeedbackContext();

  if (showResponsePage) return <ResponsePage />;
  return <FeedbackForm />;
};

export default FeedbackInner;
