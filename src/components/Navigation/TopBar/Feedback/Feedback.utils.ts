import { environment } from '../../../../utils';
import { FeedbackContentType, FeedbackEnum } from './FeedbackForm/FeedbackForm';

const { getAppName } = environment;

export const createSlackMessage = (
  feedbackContent: FeedbackContentType,
  selectedType: FeedbackEnum | undefined
) => {
  if (selectedType === FeedbackEnum.ERROR) {
    return {
      blocks: [
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
      ],
    };
  } else {
    return {
      blocks: [
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
      ],
    };
  }
};
