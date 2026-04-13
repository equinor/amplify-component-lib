import {
  AnswerId,
  QuestionType,
  SurveyResponseId,
  SurveyResponseStatus,
  UserSurveyVm,
} from '@equinor/subsurface-app-management';
import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

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

const defaultSurvey: UserSurveyVm = {
  surveyId: {
    value: 'someId',
  },
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
  ],
};

export const Default: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...surveyHandlers,
        http.get(
          '*/api/v1/surveys/applications/:applicationName/me',
          async () => HttpResponse.json(defaultSurvey)
        ),
      ],
    },
  },
};

export const TestDefault: Story = {
  tags: ['test-only'],
  args: {},
  parameters: {
    msw: {
      handlers: [
        ...surveyHandlers,
        http.get(
          '*/api/v1/surveys/applications/:applicationName/me',
          async () => HttpResponse.json(defaultSurvey)
        ),
      ],
    },
  },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByText(defaultSurvey.title)
    ).toBeInTheDocument();

    await expect(
      await canvas.findByText(defaultSurvey.questions[0].text)
    ).toBeInTheDocument();

    await expect(
      await canvas.findByText(`Question 1 of ${defaultSurvey.questions.length}`)
    ).toBeInTheDocument();

    await expect(await canvas.findByText('50%')).toBeInTheDocument();
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

    const textField = canvas.getByRole('textbox');

    await userEvent.type(textField, 'This is my answer', {
      delay: 10,
    });

    await expect(getStartedButton).toBeEnabled();

    await userEvent.click(getStartedButton);

    await expect(
      await canvas.findByText(defaultSurvey.questions[1].text, undefined, {
        timeout: 1500,
      })
    ).toBeInTheDocument();

    for (const option of defaultSurvey.questions[1].options ?? []) {
      await expect(
        canvas.getByRole('checkbox', { name: option.optionText })
      ).toBeInTheDocument();
    }

    const finishButton = canvas.getByRole('button', { name: /finish/i });

    await expect(finishButton).toBeDisabled();

    await userEvent.click(
      canvas.getByRole('checkbox', {
        name: defaultSurvey.questions[1].options?.at(0)!.optionText,
      })
    );

    await expect(finishButton).toBeEnabled();

    await userEvent.click(finishButton);

    await waitFor(() =>
      expect(canvas.queryByText(defaultSurvey.title)).not.toBeInTheDocument()
    );
  },
};
