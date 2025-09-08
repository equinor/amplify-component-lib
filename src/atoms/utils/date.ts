// formatDate(new Date()) => 16. June 2021
// formatDate(new Date(), {format: 'DD.MM.YYYY'}) => 16.06.2021
// formatDate(new Date(), {format: 'DD.MM.YY'}) => 16.06.21
// formatDate(new Date(), {format: 'YYYY-MM-DD'}) => 2021-06-16
// formatDate(new Date(), {format: 'DD. month YYYY'}) => 16. June 2021
// formatDate(new Date(), {format: 'DD. month', month: 'short'}) => 16. Dec

type FormatDateOptions =
  | { format: 'DD. month YYYY' | 'DD. month'; month?: 'short' | 'long' }
  | { format: 'DD.MM.YYYY' | 'YYYY-MM-DD' | 'DD.MM.YY' };
/**
 * @param date - The date obj / date string to format
 * @param options - Default is { format: 'DD. month YYYY', month: 'long' }
 */
export const formatDate = (
  date: Date | string | null | undefined,
  options: FormatDateOptions & {
    useUTC?: boolean;
  } = {
    format: 'DD. month YYYY',
    month: 'long',
  }
): string | undefined => {
  if (date) {
    const dateObj = new Date(date);
    if (dateObj.getTime()) {
      if (options?.format === 'DD. month YYYY') {
        const day = dateObj.toLocaleDateString('en-GB', {
          day: 'numeric',
          timeZone: options.useUTC ? 'UTC' : undefined,
        });
        return `${day}. ${dateObj.toLocaleString('en-GB', {
          month: options?.month ?? 'long',
          year: 'numeric',
          timeZone: options.useUTC ? 'UTC' : undefined,
        })}`;
      }

      const day = options?.useUTC ? dateObj.getUTCDate() : dateObj.getDate();
      const month = options?.useUTC
        ? dateObj.getUTCMonth() + 1
        : dateObj.getMonth() + 1;
      const year = options?.useUTC
        ? dateObj.getUTCFullYear()
        : dateObj.getFullYear();
      if (options?.format === 'DD. month') {
        const day = dateObj.toLocaleDateString('en-GB', {
          day: 'numeric',
          timeZone: options.useUTC ? 'UTC' : undefined,
        });
        return `${day}. ${dateObj.toLocaleString('en-GB', {
          month: options.month ?? 'long',
          timeZone: options.useUTC ? 'UTC' : undefined,
        })}`;
      }
      if (options?.format === 'YYYY-MM-DD') {
        return `${year.toString().padStart(4, '0')}-${month
          .toString()
          .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      }
      if (options?.format === 'DD.MM.YY') {
        return `${day.toString().padStart(2, '0')}.${month
          .toString()
          .padStart(2, '0')}.${year.toString().padStart(4, '0').slice(-2)}`;
      }
      return `${day.toString().padStart(2, '0')}.${month
        .toString()
        .padStart(2, '0')}.${year.toString().padStart(4, '0')}`;
    }
  }
  return undefined;
};

// formatDateTime(new Date()) => 19. January 2022, 01:32
// formatDateTime(new Date(), {month: 'short'}) => 19. Jan 2022, 01:32
export const formatDateTime = (
  date: Date | string | null | undefined,
  options: {
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    hideYear?: boolean;
    isGMT?: boolean;
  } = {
    month: 'long',
    hideYear: false,
    isGMT: false,
  }
): string | undefined => {
  if (date) {
    const dateObj = new Date(date);
    if (dateObj.getTime()) {
      if (options.isGMT ?? false) {
        dateObj.setTime(
          dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
        );
      }
      const day = dateObj.toLocaleDateString('en-GB', { day: 'numeric' });
      return `${day}. ${dateObj.toLocaleString('en-GB', {
        month: options.month ?? 'long',
        year: options.hideYear ? undefined : 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
  }
  return undefined;
};

// formatRelativeDateTime(new Date()) => Today at 7:17
// formatRelativeDateTime(new Date(2018, 11, 24, 10, 33)) => 24. November 2018, 10:33
export const formatRelativeDateTime = (
  date: Date | string | null | undefined,
  isGMT = false
): string | undefined => {
  if (date) {
    const dateObj = new Date(date);
    const today = new Date();
    if (dateObj.getTime()) {
      if (isGMT) {
        dateObj.setTime(
          dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
        );
      }
      const differenceInMS =
        dateObj < today
          ? today.getTime() - dateObj.getTime()
          : dateObj.getTime() - today.getTime();
      const differenceInDays = differenceInMS / (1000 * 3600 * 24);
      const time = dateObj.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      });
      if (differenceInDays < 1 && dateObj.getDate() === today.getDate()) {
        return `Today at ${time}`;
      } else if (differenceInDays < 2 && dateObj < today) {
        // Yesterday
        return `Yesterday at ${time}`;
      } else if (differenceInDays < 2 && differenceInDays >= 0) {
        // Tomorrow
        return `Tomorrow at ${time}`;
      } else if (
        differenceInDays > 2 &&
        differenceInDays < 7 &&
        dateObj > today
      ) {
        // Show weekday
        return `${dateObj.toLocaleString('en-GB', {
          weekday: 'long',
        })} at ${time}`;
      } else {
        // Before yesterday or in more than a week, show normal formatDateTime
        return formatDateTime(date, {
          hideYear: dateObj.getFullYear() === today.getFullYear(),
        });
      }
    }
  }
  return undefined;
};

export const isBetweenDates = (
  date: Date | string | null | undefined,
  dates: [Date, Date]
): boolean => {
  if (date) {
    const dateObj = new Date(date);
    if (dateObj.getTime()) {
      return dateObj >= dates[0] && dateObj <= dates[1];
    }
  }
  return false;
};
