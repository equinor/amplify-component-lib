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
}

export enum notificationFilter {
  UNREAD = 'unread',
  SYSTEM = 'systemUser',
  USER = 'user',
}

export enum notificationSort {
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
  user: userNotification;
  toUser: userNotification;
  applicationName: string;
  time: number;
  footer?: boolean;
  field: string;
  notificationType: NotificationsTypes;
  onDelete?: () => void;
} & SignalRMessage;

export type ReadyToReportNotificationTypes = {
  dataType: string;
  wellbore: string;
  notificationType: NotificationsTypes.READY_TO_REPORT;
} & NotificationDto;

export type DefaultNotificationProps = {
  message: string;
  notificationType: NotificationsTypes.DEFAULT;
} & NotificationDto;

export type RequestReviewOrcaProps = {
  fromUser: userNotification;
  branchName: string;
  notificationType: NotificationsTypes.REQUESTED_REVIEW;
} & NotificationDto;

export type RequestChangeOrcaProps = {
  fromUser: userNotification;
  branchName: string;
  notificationType: NotificationsTypes.REQUESTED_CHANGES;
} & NotificationDto;

export type MergeBranchOrcaProps = {
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

export type ReviewQANotificationsProps = {
  well: TagDto;
  experience: NotificationExperienceDto;
  experienceComments: number;
  notificationType: NotificationsTypes.QA_COMMENTS;
} & NotificationDto;

export type Due3WeeksProps = {
  well: TagDto;
  commentsCount: number;
  notificationType: NotificationsTypes.DUE_3_WEEKS;
} & NotificationDto;

export type ExperienceReadyToPublishProps = {
  well: TagDto;
  experienceCount: number;
  notificationType: NotificationsTypes.EXPERIENCE_READY_TO_PUBLISH;
} & NotificationDto;
