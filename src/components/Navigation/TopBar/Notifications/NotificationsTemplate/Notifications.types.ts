export type userNotification = {
  userRole: string;
  shortName: string;
  displayName: string;
  image: string;
};

export enum NotificationsTypes {
  READY_TO_REPORT = 'readytoreport',
  DEFAULT = 'default',
  REQUESTED_REVIEW = 'requestReview',
  REQUESTED_CHANGES = 'requestedChanges',
  MERGE_BRANCH = 'mergeBranch',
  QA_COMMENTS = ' TaskInReview',
  DUE_3_WEEKS = 'WellDueForReport',
  EXPERIENCE_READY_TO_PUBLISH = 'WellReadyForPublishing ',
  SYSTEM_USER = 'systemUser',
}

export enum FilterNotification {
  UNREAD = 'unread',
  SYSTEM = 'systemUser',
  USER = 'user',
}

export enum SortNotification {
  NEW_OLDEST = 'newtoold',
  OLD_NEWEST = 'oldtonew',
  UNREAD = 'unread',
}

export type SignalRMessage = {
  SequenceNumber: number;
  Read: boolean;
  Subject?: string | null;
};

export type NotificationDto = {
  notificationId?: string | null;
  user: userNotification | null;
  toUser: userNotification;
  applicationName: string;
  time: string;
  field: string;
  notificationType: NotificationsTypes;
  footer?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
} & SignalRMessage;

export type ReadyToReportNotificationTypes = {
  dataType: string;
  wellbore: string;
  notificationType: NotificationsTypes.READY_TO_REPORT;
} & NotificationDto;

export type DefaultNotificationTypes = {
  message: string;
  notificationType: NotificationsTypes.DEFAULT;
} & NotificationDto;

export type RequestReviewOrcaTypes = {
  fromUser: userNotification;
  branchName: string;
  notificationType: NotificationsTypes.REQUESTED_REVIEW;
} & NotificationDto;

export type RequestChangeOrcaTypes = {
  fromUser: userNotification;
  branchName: string;
  notificationType: NotificationsTypes.REQUESTED_CHANGES;
} & NotificationDto;

export type MergeBranchOrcaTypes = {
  fromUser: userNotification;
  branchName: string;
  notificationType: NotificationsTypes.MERGE_BRANCH;
} & NotificationDto;

export type NotificationExperienceDto = {
  id?: string | null;
  title?: string | null;
  topic?: TagDto;
};
export type TagDto = {
  shortName?: string | null;
  displayName?: string | null;
};

export type ReviewQANotificationsTypes = {
  well: TagDto;
  experience: NotificationExperienceDto;
  experienceComments: number;
  notificationType: NotificationsTypes.QA_COMMENTS;
} & NotificationDto;

export type Due3WeeksTypes = {
  well: TagDto;
  commentsCount: number;
  notificationType: NotificationsTypes.DUE_3_WEEKS;
} & NotificationDto;

export type ExperienceReadyToPublishTypes = {
  well: TagDto;
  experienceCount: number;
  notificationType: NotificationsTypes.EXPERIENCE_READY_TO_PUBLISH;
} & NotificationDto;

export type SystemUserTypes = {
  notificationType: NotificationsTypes.SYSTEM_USER;
} & NotificationDto;
