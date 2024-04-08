import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { waitFor } from '@testing-library/react';

import { render, renderHook, screen, userEvent } from '../../tests/test-utils';
import { TutorialProvider } from '../index';
import {
  DIALOG_EDGE_MARGIN,
  TUTORIAL_HIGHLIGHTER_DATATEST_ID,
  TUTORIAL_LOCALSTORAGE_VALUE_STRING,
} from './TutorialProvider.const';
import {
  CancelablePromise,
  CustomTutorialStep,
  GenericTutorialStep,
  Tutorial,
  TutorialPosition,
} from 'src/api';
import { useTutorial } from 'src/providers/TutorialProvider/TutorialProvider.hooks';

import { beforeEach, describe, expect, test } from 'vitest';

const TEST_TUTORIAL_SHORT_NAME = 'test-tutorial';
const TEST_TUTORIAL_FROM_BACKEND_SHORT_NAME = 'test-tutorial';
const TEST_TUTORIAL_CUSTOM_STEP_KEY = 'custom-step';
const TEST_TUTORIAL_SAS_TOKEN = 'thisIsASasToken';

const getMarginCss = (type: string) => {
  return `margin-${type}: ${DIALOG_EDGE_MARGIN}px;`;
};

export const getStyleStringForPosition = (position: TutorialPosition) => {
  switch (position) {
    case TutorialPosition.TOP_LEFT:
      return `${getMarginCss('top')} ${getMarginCss('left')}`;
    case TutorialPosition.TOP_RIGHT:
      return `${getMarginCss('top')} ${getMarginCss('right')}`;
    case TutorialPosition.BOTTOM_LEFT:
      return `${getMarginCss('bottom')} ${getMarginCss('left')}`;
    case TutorialPosition.BOTTOM_RIGHT:
      return `${getMarginCss('bottom')} ${getMarginCss('right')}`;
    default:
      return undefined;
  }
};

const extraFakeSteps = () => {
  const numberOfExtraSteps = faker.number.int({ min: 2, max: 5 });
  const extraSteps: (GenericTutorialStep | CustomTutorialStep)[] = [];
  for (let i = 0; i < numberOfExtraSteps; i++) {
    extraSteps.push({
      title: faker.animal.bear() + i,
      body:
        faker.animal.fish() + faker.animal.cow() + faker.animal.insect() + i,
    });
  }
  return extraSteps;
};

interface FakeTutorialProps {
  position?: TutorialPosition;
  withDynamicPositioning?: boolean;
  withNoCustomSteps?: boolean;
  tutorialFromBackendHook?: boolean;
  willPopup?: boolean;
}

const fakeTutorial = (props?: FakeTutorialProps) => {
  return {
    id: 'testid',
    name: 'Storybook tutorial',
    shortName: props?.tutorialFromBackendHook
      ? TEST_TUTORIAL_FROM_BACKEND_SHORT_NAME
      : TEST_TUTORIAL_SHORT_NAME,
    path: props?.tutorialFromBackendHook ? '/anotherPath' : '/path',
    application: 'test',
    showInProd: false,
    willPopUp: props?.willPopup ?? false,
    dynamicPositioning: props?.withDynamicPositioning,
    steps: [
      {
        position: props?.position ?? undefined,
        title: faker.animal.cat(),
        body: faker.animal.crocodilia(),
        imgUrl: 'https://placehold.co/200x700/png',
        key: undefined,
      },
      {
        title: faker.animal.cetacean(),
        body: faker.animal.dog(),
        key: null,
      },
      props?.withNoCustomSteps
        ? { title: faker.animal.snake(), body: faker.animal.rodent() }
        : { key: TEST_TUTORIAL_CUSTOM_STEP_KEY },
      ...extraFakeSteps(),
    ],
  } as Tutorial;
};

let requestsHaveError = false;
vi.mock('src/api/services/TutorialService', () => {
  class TutorialService {
    public static getTutorialsForApplication(): CancelablePromise<Tutorial[]> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (requestsHaveError) {
            reject({ message: 'getTutorialsError' });
          } else {
            resolve([fakeTutorial({ tutorialFromBackendHook: true })]);
          }
        }, 500)
      );
    }

    public static getTutorialSasToken(): CancelablePromise<string> {
      return new CancelablePromise((resolve, reject) =>
        setTimeout(() => {
          if (requestsHaveError) {
            reject({ message: 'getSasTokenError' });
          } else {
            resolve(TEST_TUTORIAL_SAS_TOKEN);
          }
        }, 500)
      );
    }
  }
  return { TutorialService };
});

interface GetMemoryRouterProps {
  tutorial?: Tutorial;
  withNoSearchParams?: boolean;
  withMissingCustomComponent?: boolean;
  withMissingElementToHighlight?: boolean;
  withWrongCustomComponentKeyString?: boolean;
  withNoTutorialsOnPath?: boolean;
  withPathForTutorialFromHook?: boolean;
}

const getMemoryRouter = (props: GetMemoryRouterProps) => {
  const {
    tutorial,
    withNoSearchParams,
    withMissingCustomComponent,
    withMissingElementToHighlight,
    withWrongCustomComponentKeyString,
    withNoTutorialsOnPath,
    withPathForTutorialFromHook,
  } = props;
  const queryClient = new QueryClient();

  const pathBase = withPathForTutorialFromHook ? '/anotherPath' : '/path';

  // For when tutorial is not defined, and the tutorial is coming from useGetTutorialsFromApplication hook
  const tutorialSteps = Array.from(Array(10).keys());

  return createMemoryRouter(
    [
      {
        path: withNoTutorialsOnPath ? '/thisIsTheWrongPath' : pathBase,
        element: (
          <QueryClientProvider client={queryClient}>
            <TutorialProvider
              tutorials={tutorial ? [tutorial] : []}
              customStepComponents={
                withMissingCustomComponent
                  ? []
                  : [
                      {
                        key: withWrongCustomComponentKeyString
                          ? 'thisIsTheWrongKey'
                          : TEST_TUTORIAL_CUSTOM_STEP_KEY,
                        element: <div>{TEST_TUTORIAL_CUSTOM_STEP_KEY}</div>,
                      },
                    ]
              }
            >
              {tutorialSteps.map((step, index) => {
                if (withMissingElementToHighlight && index > 3) return null;
                return (
                  <div key={step} id={`${TEST_TUTORIAL_SHORT_NAME}-${step}`}>
                    {`Element-${index}`}
                  </div>
                );
              })}
            </TutorialProvider>
          </QueryClientProvider>
        ),
      },
    ],
    {
      initialEntries: [
        withNoSearchParams
          ? pathBase
          : `${pathBase}?tutorial=${encodeURIComponent(TEST_TUTORIAL_SHORT_NAME)}`,
      ],

      initialIndex: 0,
    }
  );
};

const getStepTitleOrKey = (step: GenericTutorialStep | CustomTutorialStep) => {
  if (step.key === undefined || step.key === null) {
    return step.title;
  } else {
    return step.key;
  }
};

const waitForBackendCall = async () => {
  return new Promise((resolve) => setTimeout(resolve, 600));
};

// scrollIntoView is not implemented in JSDOM
// GitHub issue: https://github.com/jsdom/jsdom/issues/1695
window.HTMLElement.prototype.scrollIntoView = () => null;

describe('TutorialProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    import.meta.env.VITE_ENVIRONMENT_NAME = 'development';

    requestsHaveError = false;
  });

  test('useTutorial throws error if used outside provider', () => {
    console.error = vi.fn();
    expect(() => renderHook(() => useTutorial())).toThrowError(
      "'useTutorial' must be used within a TutorialProvider"
    );
  });

  test('can skip tutorial', async () => {
    window.localStorage.setItem(
      TEST_TUTORIAL_SHORT_NAME,
      TUTORIAL_LOCALSTORAGE_VALUE_STRING
    );
    const tutorial = fakeTutorial();
    const user = userEvent.setup();
    const router = getMemoryRouter({ tutorial });
    render(<RouterProvider router={router} />);

    const highlighterElement = screen.queryByTestId(
      TUTORIAL_HIGHLIGHTER_DATATEST_ID
    );

    expect(highlighterElement).toBeInTheDocument();

    const skipButton = screen.getByText(/skip/i);

    expect(skipButton).toBeInTheDocument();

    await user.click(skipButton);

    expect(highlighterElement).not.toBeInTheDocument();
  });

  test("can go through tutorial and click 'Done'", async () => {
    const tutorial = fakeTutorial();
    const user = userEvent.setup();
    render(<RouterProvider router={getMemoryRouter({ tutorial })} />);
    const highlighterElement = screen.queryByTestId(
      TUTORIAL_HIGHLIGHTER_DATATEST_ID
    );

    expect(highlighterElement).toBeInTheDocument();
    const steps = tutorial.steps;

    await waitForBackendCall();
    for (let i = 0; i < steps.length - 1; i++) {
      const currentStep = steps[i];
      if (currentStep.key === undefined || currentStep.key === null) {
        const stepTitle = screen.queryByText(currentStep.title);
        const stepBody = screen.queryByText(currentStep.body);

        expect(stepTitle).toBeInTheDocument();
        expect(stepBody).toBeInTheDocument();

        if (currentStep.imgUrl && currentStep.imgUrl.length > 0) {
          const image = screen.getByTestId('tutorial-image');
          expect(image).toHaveAttribute(
            'src',
            `${currentStep.imgUrl}?${TEST_TUTORIAL_SAS_TOKEN}`
          );
        }
      } else {
        const customContent = screen.queryByText(TEST_TUTORIAL_CUSTOM_STEP_KEY);
        expect(customContent).toBeInTheDocument();
      }
      const nextButton = screen.getByText(/next/i);

      await user.click(nextButton);
    }

    const doneButton = screen.getByText(/done/i);
    await user.click(doneButton);

    expect(highlighterElement).not.toBeInTheDocument();
  });

  test('can click "prev" to go back one step', async () => {
    const tutorial = fakeTutorial({
      withDynamicPositioning: true,
      withNoCustomSteps: true,
    });
    const user = userEvent.setup();
    render(<RouterProvider router={getMemoryRouter({ tutorial })} />);

    const stepOneTitle = screen.queryByText(
      getStepTitleOrKey(tutorial.steps[0])
    );
    expect(stepOneTitle).toBeInTheDocument();

    const nextButton = screen.getByText(/next/i);
    await user.click(nextButton);

    const stepTwoTitle = screen.queryByText(
      getStepTitleOrKey(tutorial.steps[1])
    );
    expect(stepTwoTitle).toBeInTheDocument();

    const stepOneTitleAgain = screen.queryByText(
      getStepTitleOrKey(tutorial.steps[0])
    );
    expect(stepOneTitleAgain).not.toBeInTheDocument();

    const prevButton = screen.getByText(/prev/i);
    await user.click(prevButton);

    const stepOneTitleAgainAgain = screen.queryByText(
      getStepTitleOrKey(tutorial.steps[0])
    );
    expect(stepOneTitleAgainAgain).toBeInTheDocument();
  });

  test('will not show highlighter/dialog if no tutorials exist on path', () => {
    render(<RouterProvider router={getMemoryRouter({})} />);

    const highlighterElement = screen.queryByTestId(
      TUTORIAL_HIGHLIGHTER_DATATEST_ID
    );

    expect(highlighterElement).not.toBeInTheDocument();
  });
  test('will show tutorial from useGetTutorialsForApp hook', async () => {
    render(
      <RouterProvider
        router={getMemoryRouter({ withPathForTutorialFromHook: true })}
      />
    );
    await waitForBackendCall();
    const highlighterElement = screen.queryByTestId(
      TUTORIAL_HIGHLIGHTER_DATATEST_ID
    );

    expect(highlighterElement).toBeInTheDocument();
  });

  test('does not show active tutorial in prod if "showInProd" is false', () => {
    import.meta.env.VITE_ENVIRONMENT_NAME = 'production';
    const tutorial = fakeTutorial();
    const router = getMemoryRouter({ tutorial });
    render(<RouterProvider router={router} />);

    const highlighterElement = screen.queryByTestId(
      TUTORIAL_HIGHLIGHTER_DATATEST_ID
    );
    expect(highlighterElement).not.toBeInTheDocument();

    const skipDialogButton = screen.queryByText(/test/i);
    expect(skipDialogButton).not.toBeInTheDocument();
  });

  describe('TutorialProvider error handling', () => {
    test('shows and can close error dialog when missing custom component, if tutorial started from searchparam', async () => {
      window.localStorage.setItem(
        TEST_TUTORIAL_SHORT_NAME,
        TUTORIAL_LOCALSTORAGE_VALUE_STRING
      );

      const user = userEvent.setup();
      const tutorial = fakeTutorial();
      const spy = vi.spyOn(console, 'error');
      render(
        <RouterProvider
          router={getMemoryRouter({
            tutorial,
            withMissingCustomComponent: true,
          })}
        />
      );

      await new Promise((resolve) => setTimeout(resolve, 400));
      expect(spy).toHaveBeenCalledTimes(1);

      const errorDialogText = screen.getByText(
        /there was a problem starting this tutorial./i
      );
      expect(errorDialogText).toBeInTheDocument();

      const closeButton = screen.getByText(/close/i);
      expect(closeButton).toBeInTheDocument();

      await user.click(closeButton);

      expect(closeButton).not.toBeInTheDocument();
    }, 10000);

    test('shows error dialog when having wrong custom components, if tutorial started from searchparam', () => {
      window.localStorage.setItem(
        TEST_TUTORIAL_SHORT_NAME,
        TUTORIAL_LOCALSTORAGE_VALUE_STRING
      );
      const tutorial = fakeTutorial();
      const spy = vi.spyOn(console, 'error');
      render(
        <RouterProvider
          router={getMemoryRouter({
            tutorial,
            withWrongCustomComponentKeyString: true,
          })}
        />
      );
      expect(spy).toHaveBeenCalledTimes(1);

      const errorDialogText = screen.getByText(
        /there was a problem starting this tutorial./i
      );
      expect(errorDialogText).toBeInTheDocument();
    });

    test('shows error dialog when not finding all elements to highlight, if tutorial started from searchparam', async () => {
      window.localStorage.setItem(
        TEST_TUTORIAL_SHORT_NAME,
        TUTORIAL_LOCALSTORAGE_VALUE_STRING
      );
      const tutorial = fakeTutorial();
      const spy = vi.spyOn(console, 'error');
      render(
        <RouterProvider
          router={getMemoryRouter({
            tutorial,
            withMissingElementToHighlight: true,
          })}
        />
      );

      await waitForBackendCall();
      expect(spy).toHaveBeenCalledTimes(3); // Two extra for act() warnings

      const errorDialogText = screen.getByText(
        /there was a problem starting this tutorial./i
      );
      expect(errorDialogText).toBeInTheDocument();
    });

    test('shows nothing if tutorial has error when trying to run without search param', async () => {
      const tutorial = fakeTutorial({ willPopup: true });
      const spy = vi.spyOn(console, 'error');
      render(
        <RouterProvider
          router={getMemoryRouter({
            tutorial,
            withNoSearchParams: true,
            withMissingElementToHighlight: true,
          })}
        />
      );

      await waitForBackendCall();
      expect(spy).toHaveBeenCalledTimes(3); // Two extra for act() warnings

      const errorDialogText = screen.queryByText(
        /there was a problem starting this tutorial./i
      );
      expect(errorDialogText).not.toBeInTheDocument();

      const highlighterElement = screen.queryByTestId(
        TUTORIAL_HIGHLIGHTER_DATATEST_ID
      );
      expect(highlighterElement).not.toBeInTheDocument();

      if (tutorial.steps[0].key === undefined) {
        const stepOneTitle = screen.queryByText(tutorial.steps[0].title);
        expect(stepOneTitle).not.toBeInTheDocument();
      }
    });
  });

  describe('can define dialog position for individual steps', () => {
    for (const position of Object.values(TutorialPosition)) {
      test(`can define first step with position: '${position}'`, async () => {
        const tutorial = fakeTutorial({
          position: position,
        });

        render(<RouterProvider router={getMemoryRouter({ tutorial })} />);

        const dialog = screen.getByTestId('tutorial-dialog');

        if (position === TutorialPosition.CENTER) {
          expect(dialog).not.toHaveAttribute(`style`);
        } else {
          await waitFor(
            () =>
              expect(dialog).toHaveAttribute(
                `style`,
                getStyleStringForPosition(position as TutorialPosition)
              ),
            { timeout: 1000 }
          );
        }
      });
    }
  });

  test('shows nothing if there are no tutorials for app', async () => {
    requestsHaveError = true;
    render(<RouterProvider router={getMemoryRouter({})} />);

    await waitForBackendCall();

    const errorDialogText = screen.queryByText(
      /there was a problem starting this tutorial./i
    );
    expect(errorDialogText).not.toBeInTheDocument();

    const highlighterElement = screen.queryByTestId(
      TUTORIAL_HIGHLIGHTER_DATATEST_ID
    );
    expect(highlighterElement).not.toBeInTheDocument();
  });
});
