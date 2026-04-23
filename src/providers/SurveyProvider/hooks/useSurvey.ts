import { useContext } from 'react';

import { SurveyContext } from '../SurveyProvider';

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("'useSurvey' must be used within provider");
  }
  return context;
}
