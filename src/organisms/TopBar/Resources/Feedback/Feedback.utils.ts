import { FileWithPath } from 'react-dropzone';

import {
  BugSeverity,
  ServiceNowUrgency,
  WorkItemType,
} from '@equinor/subsurface-app-management';

import { Browsers, FeedbackContentType } from './Feedback.types';
import { EnvironmentType } from 'src/atoms/enums/Environment';
import { capitalize, environment, formatDate } from 'src/atoms/utils';

const { getAppName, getEnvironmentName } = environment;

export const getSeverityEmoji = (feedbackContent: FeedbackContentType) => {
  if (feedbackContent.urgency === BugSeverity.DOES_NOT_AFFECT_ME) {
    return ':large_yellow_circle:';
  }
  if (feedbackContent.urgency === BugSeverity.IMPEDES_MY_PROGRESS) {
    return ':large_orange_circle:';
  }
  return ':red_circle:';
};

export const readUploadedFileAsText = (
  inputFile: FileWithPath
): Promise<string> => {
  const temporaryFileReader = new FileReader();

  /* v8 ignore start */ // Rejection files not working
  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    /* v8 ignore end */
    temporaryFileReader.onload = () => {
      resolve(temporaryFileReader.result as string);
    };
    temporaryFileReader.readAsDataURL(inputFile);
  });
};

export const getUrgencyNumber = (urgency: BugSeverity) => {
  switch (urgency) {
    case BugSeverity.UNABLE_TO_WORK:
      return ServiceNowUrgency.NORMAL;
    case BugSeverity.IMPEDES_MY_PROGRESS:
      return ServiceNowUrgency.NORMAL;
    case BugSeverity.DOES_NOT_AFFECT_ME:
      return ServiceNowUrgency.NORMAL;
  }
};

export const getUrgencyDisplayText = (urgency: BugSeverity) => {
  switch (urgency) {
    case BugSeverity.UNABLE_TO_WORK:
      return 'I am unable to work';
    case BugSeverity.IMPEDES_MY_PROGRESS:
      return 'It impedes my progress';
    case BugSeverity.DOES_NOT_AFFECT_ME:
      return 'It does not affect me';
  }
};

export const createServiceNowDescription = (
  feedbackContent: FeedbackContentType,
  field: string | null | undefined
) => {
  const locationText = `Url location of bug: ${feedbackContent.url} \n`;
  const severityText = `Severity of bug: ${feedbackContent.urgency} \n`;
  const fieldText = `Field: ${capitalize(field ?? '')} \n`;
  const browserText = `Browser: ${getBrowserInfo()} \n`;

  return `${feedbackContent.url ? locationText : ''}
  ${feedbackContent.urgency ? severityText : ''}
  ${field ? fieldText : ''}
  ${browserText}
  ${feedbackContent.description} \n \n User agent string: ${
    navigator.userAgent
  }`;
};

export const createServiceNowUrl = (sysId: string, selfService?: boolean) => {
  const path = selfService
    ? 'selfservice?id=ticket&table=incident&sys_id='
    : 'now/nav/ui/classic/params/target/incident.do%3Fsys_id%3D';
  /* v8 ignore start*/
  const isProd =
    getEnvironmentName(import.meta.env.VITE_ENVIRONMENT_NAME) ===
    EnvironmentType.PRODUCTION;
  /* v8 ignore end */
  return `https://equinor${
    isProd ? '' : 'test'
  }.service-now.com/${path}${sysId}`;
};

const getBrowserName = () => {
  if (navigator.userAgent.includes(Browsers.EDGE_SHORT)) {
    return Browsers.EDGE;
  } else if (navigator.userAgent.includes(Browsers.CHROME)) {
    return Browsers.CHROME;
  } else if (navigator.userAgent.includes(Browsers.SAFARI)) {
    return Browsers.SAFARI;
  } else if (navigator.userAgent.includes(Browsers.FIREFOX)) {
    return Browsers.FIREFOX;
  } else {
    return;
  }
};

const getBrowserVersion = (browserName: Browsers) => {
  let browserNameToUse = browserName;
  if (browserName === Browsers.EDGE) {
    browserNameToUse = Browsers.EDGE_SHORT;
  }
  const regex = new RegExp(`${browserNameToUse}/(\\d+(?:\\.\\d+)+)`);
  return navigator.userAgent.match(regex)?.[1];
};

export const getBrowserInfo = () => {
  const browserName = getBrowserName();
  if (browserName) {
    return `${browserName} (${getBrowserVersion(browserName)})`;
  }
  return 'Not found';
};

export const createSlackMessage = (
  feedbackContent: FeedbackContentType,
  field?: string | null,
  selectedType?: WorkItemType,
  email?: string,
  sysId?: string | null
) => {
  const isBugReport = selectedType === WorkItemType.BUG;
  const typeText = isBugReport ? ':bug: Bug report' : ':bulb: Suggestion';

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

  if (feedbackContent.urgency) {
    titleAndSeveritySectionArray.push({
      type: 'mrkdwn',
      text: `*Severity* \n ${getSeverityEmoji(feedbackContent)} ${getUrgencyDisplayText(
        feedbackContent.urgency
      )}`,
    });
  }
  const blockArray = [
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
          text: `*User* \n ${email}`,
        },
      ],
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: '*Browser* \n ' + getBrowserInfo(),
        },
        {
          type: 'mrkdwn',
          text: `*Field* \n ${capitalize(field ?? 'Not found')}`,
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
  ];

  if (sysId) {
    blockArray.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*<${createServiceNowUrl(
          sysId
        )}|:link: Click to open the ticket in Service Now>*`,
      },
    });
  }
  // @ts-expect-error typing error for slack block kit maker
  blockArray.push({
    type: 'divider',
  });
  return JSON.stringify(blockArray);
};
