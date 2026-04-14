import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useSurvey } from './hooks/useSurvey';
import { SurveyQuestion } from './SurveyDialog/SurveyQuestion/SurveyQuestion';
import {
  SurveyContext,
  SurveyContextType,
  SurveyProvider,
} from './SurveyProvider';
import { ConfettiProvider } from 'src/providers/ConfettiProvider/ConfettiProvider';
import { ToastProvider } from 'src/providers/ToastProvider/ToastProvider';
import { render, renderHook, test, waitFor } from 'src/tests/browsertest-utils';

import { http, HttpResponse } from 'msw';

function TestProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ConfettiProvider>
          <SurveyProvider>{children as React.ReactElement}</SurveyProvider>
        </ConfettiProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}

test("'useSurvey' hook throws error if using outside of context", () => {
  console.error = vi.fn();
  expect(() => renderHook(() => useSurvey())).toThrow(
    "'useSurvey' must be used within provider"
  );
});

test("'useSurvey' answerQuestion throws error when there is no active survey", async ({
  worker,
}) => {
  worker.use(
    http.get('*/api/v1/surveys/applications/:applicationName/me', () =>
      HttpResponse.text('No data', { status: 404 })
    )
  );

  const { result } = renderHook(() => useSurvey(), { wrapper: TestProviders });

  await waitFor(() => expect(result.current.activeSurvey).toBeUndefined());

  await expect(
    result.current.answerQuestion({ textAnswer: 'test' })
  ).rejects.toThrow('No active survey or question to answer');
});

const mockContextValue: SurveyContextType = {
  activeSurvey: undefined,
  activeQuestionIndex: 0,
  setActiveQuestionIndex: vi.fn(),
  answerQuestion: vi.fn(),
  currentAnswer: undefined,
  setCurrentAnswer: vi.fn(),
  cancelSurvey: vi.fn(),
  hideSurvey: vi.fn(),
  isCancelled: false,
  completeSurvey: vi.fn(),
};

test("'SurveyQuestion' throws error when there is no active survey", () => {
  console.error = vi.fn();
  expect(() =>
    render(
      <SurveyContext.Provider value={mockContextValue}>
        <SurveyQuestion />
      </SurveyContext.Provider>
    )
  ).toThrow("SurveyQuestion couldn't find active survey or question");
});
