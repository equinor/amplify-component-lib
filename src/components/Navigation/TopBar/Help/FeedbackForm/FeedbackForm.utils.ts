import { FeedbackContentType, FeedbackEnum } from './FeedbackForm.types';
import { date, environment } from 'src/utils';

const { formatDate } = date;
const { getAppName } = environment;

export const createServiceNowDescription = (
  feedbackContent: FeedbackContentType
) => {
  return `Url location of bug: ${feedbackContent.url} \n Severity of bug: ${feedbackContent.severity} \n ${feedbackContent.description}`;
};

export const createSlackMessage = (
  feedbackContent: FeedbackContentType,
  selectedType: FeedbackEnum | undefined,
  email: string | undefined
) => {
  if (selectedType === FeedbackEnum.ERROR) {
    return JSON.stringify([
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Date: ${formatDate(new Date(), { format: 'DD.MM.YY' })}`,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: '*Title* \n ' + feedbackContent.title,
          },
          {
            type: 'mrkdwn',
            text: '*Application* \n ' + getAppName(import.meta.env.VITE_NAME),
          },
          {
            type: 'mrkdwn',
            text: '*Severity* \n ' + feedbackContent.severity,
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Description* \n' + feedbackContent.description,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*<https://dev.azure.com/Equinor/Johan%20Sverdrup%20Digitalisation|Service now>*',
        },
      },
      {
        type: 'divider',
      },
    ]);
  } else {
    return JSON.stringify([
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Report nr. 233 collected 08.02.2023*',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: '*Title* \n ' + feedbackContent.title,
          },
          {
            type: 'mrkdwn',
            text: '*Application* \n ' + getAppName(import.meta.env.VITE_NAME),
          },
          {
            type: 'mrkdwn',
            text: '*Email* \n ' + feedbackContent.consent ? email : 'Not given',
          },
        ],
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Description* \n' + feedbackContent.description,
        },
      },
      {
        type: 'divider',
      },
    ]);
  }
};
