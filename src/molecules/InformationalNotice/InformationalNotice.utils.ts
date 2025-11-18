import { InformationalNoticeProps } from './InformationalNotice';

export function getIconSize(spacing: InformationalNoticeProps['spacing']) {
  switch (spacing) {
    case 'compact':
      return 18;
    case 'comfortable':
    default:
      return 24;
  }
}
