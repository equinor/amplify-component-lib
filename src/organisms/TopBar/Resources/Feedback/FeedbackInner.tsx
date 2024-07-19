import { FC } from 'react';

import { FeedbackForm } from './FeedbackForm/FeedbackForm';
import { useFeedbackContext } from './hooks/useFeedbackContext';
import { ResponsePage } from './ResponsePage/ResponsePage';

export const FeedbackInner: FC = () => {
  const { showResponsePage } = useFeedbackContext();

  if (showResponsePage) return <ResponsePage />;
  return <FeedbackForm />;
};
