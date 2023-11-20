import { FC } from 'react';

import ResponsePage from './components/ResponsePage/ResponsePage';
import { useFeedbackContext } from './hooks/useFeedbackContext';
import FeedbackForm from './FeedbackForm';

interface FeedbackInnerProps {}

const FeedbackInner: FC<FeedbackInnerProps> = () => {
  const { showResponsePage } = useFeedbackContext();

  if (showResponsePage) return <ResponsePage />;
  return <FeedbackForm />;
};

export default FeedbackInner;
