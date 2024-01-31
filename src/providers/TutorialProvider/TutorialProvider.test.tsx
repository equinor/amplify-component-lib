import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { faker } from '@faker-js/faker';

import { render, renderHook, screen, userEvent } from '../../tests/test-utils';
import { TutorialProvider } from '../index';
import { useTutorial } from './TutorialProvider';
import { TUTORIAL_HIGHLIGHTER_DATATEST_ID } from './TutorialProvider.const';
import {
  CustomTutorialStep,
  GenericTutorialStep,
  Tutorial,
  TutorialDialogPosition,
} from './TutorialProvider.types';

import { beforeEach, describe, expect } from 'vitest';

const TEST_TUTORIAL_SHORT_NAME = 'test-tutorial';
const TEST_TUTORIAL_CUSTOM_STEP_KEY = 'custom-step';

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

const fakeTutorial = (position?: TutorialDialogPosition) => {
  return {
    name: 'Storybook tutorial',
    shortName: TEST_TUTORIAL_SHORT_NAME,
    path: '/path',
    dynamicPositioning: true,
    steps: [
      {
        position: position ?? undefined,
        title: faker.animal.cat(),
        body: faker.animal.crocodilia(),
        imgUrl: 'https://placehold.co/200x700/png',
      },
      {
        title: faker.animal.cetacean(),
        body: faker.animal.dog(),
      },
      { key: TEST_TUTORIAL_CUSTOM_STEP_KEY },
      ...extraFakeSteps(),
    ],
  } as Tutorial;
};

interface GetMemoryRouterProps {
  tutorial: Tutorial;
  withoutSearchParam?: boolean;
  withMissingCustomComponent?: boolean;
  withMissingElementToHighlight?: boolean;
  withWrongCustomComponentKeyString?: boolean;
}

const getMemoryRouter = (props: GetMemoryRouterProps) => {
  const {
    tutorial,
    withoutSearchParam,
    withMissingCustomComponent,
    withMissingElementToHighlight,
    withWrongCustomComponentKeyString,
  } = props;
  return createMemoryRouter(
    [
      {
        path: '/path',
        element: (
          <TutorialProvider
            tutorials={[tutorial]}
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
            {tutorial.steps.map((step, index) => {
              if (
                withMissingElementToHighlight &&
                index > tutorial.steps.length - 3
              )
                return null;
              return (
                <div
                  key={step.key === undefined ? step.body : step.key}
                  id={`${TEST_TUTORIAL_SHORT_NAME}-${index}`}
                >
                  {`Element-${index}`}
                </div>
              );
            })}
          </TutorialProvider>
        ),
      },
    ],
    {
      initialEntries: [
        withoutSearchParam
          ? '/path'
          : `/path?tutorial=${TEST_TUTORIAL_SHORT_NAME}`,
      ],
      initialIndex: 0,
    }
  );
};

const getStepTitleOrKey = (step: GenericTutorialStep | CustomTutorialStep) => {
  if (step.key === undefined) {
    return step.title;
  } else {
    return step.key;
  }
};

// scrollIntoView is not implemented in jsdom
// GitHub issue: https://github.com/jsdom/jsdom/issues/1695
window.HTMLElement.prototype.scrollIntoView = function () {};

describe('TutorialProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('useTutorial throws error if used outside provider', () => {
    expect(() => renderHook(() => useTutorial())).toThrowError(
      "'useTutorial' must be used within a TutorialProvider"
    );
  });

  test('can skip tutorial', async () => {
    const tutorial = fakeTutorial();
    const user = userEvent.setup();
    render(<RouterProvider router={getMemoryRouter({ tutorial })} />);

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

    for (let i = 0; i < steps.length - 1; i++) {
      const currentStep = steps[i];
      if (currentStep.key === undefined) {
        const stepTitle = screen.queryByText(currentStep.title);
        const stepBody = screen.queryByText(currentStep.body);

        expect(stepTitle).toBeInTheDocument();
        expect(stepBody).toBeInTheDocument();
        if (currentStep.imgUrl) {
          const image = screen.getByAltText('tutorial-image');
          expect(image).toHaveAttribute('src', currentStep.imgUrl);
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
    const tutorial = fakeTutorial();
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

  test('shows error dialog when missing custom component, if tutorial started from searchparam', async () => {
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
    expect(spy).toHaveBeenCalledTimes(1);

    const errorDialogText = screen.getByText(
      /There was a problem starting this tutorial./i
    );

    expect(errorDialogText).toBeInTheDocument();
  });

  test('shows error dialog when having wrong custom components, if tutorial started from searchparam', async () => {
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
    expect(spy).toHaveBeenCalledTimes(2);
    screen.logTestingPlaygroundURL();
    const errorDialogText = screen.getByText(/problem starting/i);

    expect(errorDialogText).toBeInTheDocument();
  });

  // describe('can define dialog position for individual steps', () => {
  //   for (const position of Object.keys(TutorialDialogPosition)) {
  //     test(`can define first step with position: '${position}'`, async () => {
  //       const tutorial = fakeTutorial(position as TutorialDialogPosition);
  //       render(<RouterProvider router={router(tutorial)} />);
  //
  //       // await new Promise((resolve) => setTimeout(resolve, 1000));
  //       const dialog = screen.getByTestId('tutorial-dialog');
  //       // expect(dialog).toHaveAttribute(
  //       //   `style`,
  //       //   `margin-right: ${DIALOG_EDGE_MARGIN}px`
  //       // );
  //       expect(dialog).toHaveStyle('margin-left: 24px');
  //       // expect(dialog).toHaveStyleRule(
  //       //   'margin',
  //       //   `${DIALOG_EDGE_MARGIN}px`
  //     });
  //   }
  // });
});
