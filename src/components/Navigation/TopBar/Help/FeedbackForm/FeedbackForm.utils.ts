import { FeedbackContentType, FeedbackEnum } from './FeedbackForm.types';
import { SeverityOption } from 'src/components/Navigation/TopBar/Help/FeedbackForm/FeedbackFormInner';
import { date, environment } from 'src/utils';

const { formatDate } = date;
const { getAppName } = environment;

export const createServiceNowDescription = (
  feedbackContent: FeedbackContentType
) => {
  const locationText = `Url location of bug: ${feedbackContent.url} \n`;
  const severityText = `Severity of bug: ${feedbackContent.severity} \n`;

  return `${feedbackContent.url ? locationText : ''}${
    feedbackContent.severity ? severityText : ''
  }${feedbackContent.description}`;
};

export const createSlackMessage = (
  feedbackContent: FeedbackContentType,
  selectedType: FeedbackEnum | undefined,
  email: string | undefined
) => {
  const isBugReport = selectedType === FeedbackEnum.ERROR;
  const typeText = isBugReport ? ':bug: Bug report' : ':bulb: Suggestion';

  const getSeverityEmoji = () => {
    if (feedbackContent.severity === SeverityOption.NO_IMPACT) {
      return ':large_yellow_circle:';
    }
    if (feedbackContent.severity === SeverityOption.IMPEDES) {
      return ':large_orange_circle:';
    }
    return ':red_circle:';
  };

  const dateAndUrlSectionArray = [];
  const titleAndSeveritySectionArray = [];

  titleAndSeveritySectionArray.push({
    type: 'mrkdwn',
    text: `*Title* \n ${feedbackContent.title}`,
  });
  dateAndUrlSectionArray.push({
    type: 'mrkdwn',
    text: ` ${formatDate(new Date(), {
      format: 'DD. month YYYY',
    })}`,
  });

  if (feedbackContent.url) {
    dateAndUrlSectionArray.push({
      type: 'mrkdwn',
      text: `*<${feedbackContent.url}|Error URL>*`,
    });
  }

  if (feedbackContent.severity) {
    titleAndSeveritySectionArray.push({
      type: 'mrkdwn',
      text: `*Severity* \n ${getSeverityEmoji()} ${feedbackContent.severity}`,
    });
  }

  return JSON.stringify([
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: typeText,
        emoji: true,
      },
    },
    {
      type: 'section',
      fields: dateAndUrlSectionArray,
    },
    {
      type: 'section',
      fields: titleAndSeveritySectionArray,
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: '*Application* \n ' + getAppName(import.meta.env.VITE_NAME),
        },
        {
          type: 'mrkdwn',
          text: `*User* \n ${
            feedbackContent.consent ? email : 'No email Provided'
          }`,
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
};
