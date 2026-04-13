import {
  AnswerId,
  QuestionType,
  SurveyResponseId,
  SurveyResponseStatus,
  SurveyType,
  UserSurveyVm,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { useSurvey } from './hooks/useSurvey';
import { SurveyProvider } from './SurveyProvider';

import { delay, http, HttpResponse } from 'msw';
import { expect, userEvent, waitFor } from 'storybook/test';

const meta: Meta<typeof SurveyProvider> = {
  title: 'Providers/SurveyProvider',
  component: SurveyProvider,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/xRWyfJ7Ee4CjcUs91RA0sx/%E2%9A%99%EF%B8%8F-SAM---Design?node-id=9408-25790&m=dev',
    },
  },
  args: {},
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<typeof SurveyProvider>;

const surveyHandlers = [
  http.get('*/api/v1/Token/SamPortal', async () => {
    await delay('real');
    return HttpResponse.text(faker.string.nanoid());
  }),
  http.post('*/api/v1/surveys/:surveyId/survey/me', async () => {
    await delay('real');
    const surveyResponse: SurveyResponseId = {
      value: faker.string.uuid(),
    };
    return HttpResponse.json(surveyResponse);
  }),
  http.put('*/api/v1/surveys/:surveyResponseId/responses/me', async () => {
    await delay('real');
    const answerId: AnswerId = {
      value: faker.string.uuid(),
    };
    return HttpResponse.json(answerId);
  }),
];

const standardSurvey: UserSurveyVm = {
  surveyId: {
    value: 'someId',
  },
  surveyType: SurveyType.DEFAULT,
  status: SurveyResponseStatus.NOT_STARTED,
  applicationId: 'appId',
  title: 'This is a survey!',
  description: 'This survey is quite short',
  startAt: '2026-01-01',
  endAt: '2028-01-01',
  showConfettiOnComplete: false,
  questions: [
    {
      questionId: {
        value: 'textQuestion',
      },
      type: QuestionType.TEXT,
      order: 1,
      text: 'This is the question text',
    },
    {
      questionId: { value: 'choiceQuestion' },
      type: QuestionType.CHOICE,
      text: 'Choose one please',
      order: 2,
      options: [
        {
          id: { value: 'optionOne' },
          optionText: 'First option',
          order: 1,
        },
        {
          id: { value: 'optionTwo' },
          optionText: 'Second option',
          order: 2,
        },
        {
          id: { value: 'optionThree' },
          optionText: 'Third option',
          order: 3,
        },
      ],
      maxSelections: 1,
    },
    {
      questionId: { value: 'linearScaleQuestion' },
      type: QuestionType.LINEAR_SCALE,
      order: 3,
      text: 'Is this useful?',
      linearScaleConfig: {
        min: 1,
        minLabel: 'Strongly disagree',
        max: 7,
        maxLabel: 'Strongly agree',
      },
    },
  ],
};

export const StandardSurvey: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...surveyHandlers,
        http.get(
          '*/api/v1/surveys/applications/:applicationName/me',
          async () => HttpResponse.json(standardSurvey)
        ),
      ],
    },
  },
};

export const TestStandard: Story = {
  tags: ['test-only'],
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...surveyHandlers,
        http.get(
          '*/api/v1/surveys/applications/:applicationName/me',
          async () => HttpResponse.json(standardSurvey)
        ),
      ],
    },
  },
  play: async ({ canvas, step }) => {
    await step('Has expected content in the beginning', async () => {
      await expect(
        await canvas.findByText(standardSurvey.title)
      ).toBeInTheDocument();

      await expect(
        await canvas.findByText(standardSurvey.questions[0].text)
      ).toBeInTheDocument();

      await expect(
        await canvas.findByText(
          `Question 1 of ${standardSurvey.questions.length}`
        )
      ).toBeInTheDocument();

      await expect(await canvas.findByText('33%')).toBeInTheDocument();
      await expect(
        canvas.getByRole('button', { name: /do not show me this again/i })
      ).toBeInTheDocument();
      await expect(
        canvas.getByRole('button', { name: /maybe later/i })
      ).toBeInTheDocument();
      const getStartedButton = canvas.getByRole('button', {
        name: /get started/i,
      });
      await expect(getStartedButton).toBeInTheDocument();
      await expect(getStartedButton).toBeDisabled();
    });

    await step('Write some text and start survey', async () => {
      const getStartedButton = canvas.getByRole('button', {
        name: /get started/i,
      });
      const textField = canvas.getByRole('textbox');

      await userEvent.type(textField, 'This is my answer', {
        delay: 10,
      });

      await expect(getStartedButton).toBeEnabled();

      await userEvent.click(getStartedButton);
    });

    await step('Checkbox question and click next', async () => {
      await expect(
        await canvas.findByText(standardSurvey.questions[1].text, undefined, {
          timeout: 1500,
        })
      ).toBeInTheDocument();

      for (const option of standardSurvey.questions[1].options ?? []) {
        await expect(
          canvas.getByRole('checkbox', { name: option.optionText })
        ).toBeInTheDocument();
      }

      const nextButton = canvas.getByRole('button', { name: /next/i });

      await expect(nextButton).toBeDisabled();

      // Check
      await userEvent.click(
        canvas.getByRole('checkbox', {
          name: standardSurvey.questions[1].options?.at(0)!.optionText,
        })
      );
      // Uncheck
      await userEvent.click(
        canvas.getByRole('checkbox', {
          name: standardSurvey.questions[1].options?.at(0)!.optionText,
        })
      );
      // Check again
      await userEvent.click(
        canvas.getByRole('checkbox', {
          name: standardSurvey.questions[1].options?.at(0)!.optionText,
        })
      );

      await expect(nextButton).toBeEnabled();

      await userEvent.click(nextButton);
    });

    await step('Linear scale question and complete', async () => {
      await expect(
        await canvas.findByText(standardSurvey.questions[2].text)
      ).toBeInTheDocument();
      await expect(
        canvas.getByText(
          standardSurvey.questions[2]!.linearScaleConfig!.minLabel
        )
      ).toBeInTheDocument();
      await expect(
        canvas.getByText(
          standardSurvey.questions[2]!.linearScaleConfig!.maxLabel
        )
      ).toBeInTheDocument();

      await userEvent.click(canvas.getAllByRole('radio')[0]);

      const completeButton = canvas.getByRole('button', { name: /complete/i });
      await expect(completeButton).toBeEnabled();

      await userEvent.click(completeButton);
    });

    await waitFor(() =>
      expect(canvas.queryByText(standardSurvey.title)).not.toBeInTheDocument()
    );
  },
};

const umuxSurvey: UserSurveyVm = {
  title: 'Help us improve your experience',
  surveyId: { value: 'umuxSurveyId' },
  surveyType: SurveyType.UMUX,
  status: SurveyResponseStatus.NOT_STARTED,
  applicationId: 'appId',
  showConfettiOnComplete: true,
  description: 'UMUX survey',
  startAt: '2026-01-01',
  endAt: '2028-01-01',
  questions: [
    {
      type: QuestionType.LINEAR_SCALE,
      text: 'Acquire is easy to use.',
      questionId: {
        value: 'someId',
      },
      order: 1,
      linearScaleConfig: {
        min: 1,
        minLabel: 'Strongly disagree',
        max: 7,
        maxLabel: 'Strongly agree',
      },
    },
    {
      type: QuestionType.LINEAR_SCALE,
      text: 'Acquire meets my needs.',
      questionId: {
        value: 'someOtherId',
      },
      order: 2,
      linearScaleConfig: {
        min: 1,
        minLabel: 'Strongly disagree',
        max: 7,
        maxLabel: 'Strongly agree',
      },
    },
  ],
};

export const Umux: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...surveyHandlers,
        http.get(
          '*/api/v1/surveys/applications/:applicationName/me',
          async () => HttpResponse.json(umuxSurvey)
        ),
      ],
    },
  },
};

export const TestUmux: Story = {
  tags: ['test-only'],
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...surveyHandlers,
        http.get(
          '*/api/v1/surveys/applications/:applicationName/me',
          async () => HttpResponse.json(umuxSurvey)
        ),
      ],
    },
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText(umuxSurvey.title)).toBeInTheDocument();

    const completeButton = canvas.getByRole('button', { name: /complete/i });
    await expect(completeButton).toBeDisabled();

    for (const question of umuxSurvey.questions) {
      const options = canvas.getAllByTestId(
        `range-radio-${question.questionId.value}`
      );
      await userEvent.click(options[0]);
    }

    await expect(completeButton).toBeEnabled();

    await userEvent.click(completeButton);

    await waitFor(
      () =>
        expect(canvas.queryByText(umuxSurvey.title)).not.toBeInTheDocument(),
      { timeout: 1500 }
    );
  },
};

export const TestMaybeLater: Story = {
  tags: ['test-only'],
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...surveyHandlers,
        http.get(
          '*/api/v1/surveys/applications/:applicationName/me',
          async () => HttpResponse.json(standardSurvey)
        ),
      ],
    },
  },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByText(standardSurvey.title)
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: /maybe later/i }));

    await expect(
      canvas.queryByText(standardSurvey.title)
    ).not.toBeInTheDocument();
  },
};

export const TestDoNotShowMe: Story = {
  tags: ['test-only'],
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...surveyHandlers,
        http.get(
          '*/api/v1/surveys/applications/:applicationName/me',
          async () => HttpResponse.json(standardSurvey)
        ),
      ],
    },
  },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByText(standardSurvey.title)
    ).toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole('button', { name: /do not show me this again/i })
    );

    await expect(
      canvas.queryByText(standardSurvey.title)
    ).not.toBeInTheDocument();
  },
};

function NoActiveSurveyComponent() {
  const { cancelSurvey, hideSurvey } = useSurvey();

  return (
    <div>
      <button onClick={cancelSurvey}>cancel</button>
      <button onClick={hideSurvey}>hide</button>
    </div>
  );
}

export const TestNoActiveSurvey: Story = {
  tags: ['test-only'],
  args: {},
  decorators: (Story) => (
    <SurveyProvider>
      <Story />
    </SurveyProvider>
  ),
  render: NoActiveSurveyComponent,
  parameters: {
    msw: {
      handlers: [
        ...surveyHandlers,
        http.get(
          '*/api/v1/surveys/applications/:applicationName/me',
          async () => HttpResponse.text('No data', { status: 404 })
        ),
      ],
    },
  },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: /hide/i }));
    await userEvent.click(canvas.getByRole('button', { name: /cancel/i }));

    await expect(canvas.queryByRole('dialog')).not.toBeInTheDocument();
  },
};
