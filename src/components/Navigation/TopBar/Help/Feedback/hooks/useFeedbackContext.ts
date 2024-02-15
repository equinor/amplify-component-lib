import { useContext } from 'react';

import { FeedbackContext } from '../providers/FeedbackContextProvider';

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('"useFeedbackContext" must be used within provider!');
  }
  return context;
}
