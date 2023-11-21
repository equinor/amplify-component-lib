import { FC } from 'react';

import FeedbackForm from './components/FeedbackForm/FeedbackForm';
import ResponsePage from './components/ResponsePage/ResponsePage';
import { useFeedbackContext } from './hooks/useFeedbackContext';

interface FeedbackInnerProps {}

const FeedbackInner: FC<FeedbackInnerProps> = () => {
  const { showResponsePage } = useFeedbackContext();

  if (showResponsePage) return <ResponsePage />;
  return <FeedbackForm />;
};

export default FeedbackInner;
