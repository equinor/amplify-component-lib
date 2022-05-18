import { isNaN } from 'lodash-es';

const formatDate = (
  date?: string | null,
  options?: {
    format: 'DD.MM.YYYY' | 'DD. month YYYY';
  }
) => {
  if (date) {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      // getMonth()+1 because January is 0 and so on
      if (options?.format === 'DD. month YYYY') {
        const day = dateObj.toLocaleDateString('en-GB', { day: 'numeric' });
        return `${day}. ${dateObj.toLocaleString('en-GB', {
          month: 'long',
          year: 'numeric',
        })}`;
      }
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      return `${day < 10 ? '0' + day : day}.${
        month < 10 ? '0' + month : month
      }.${year}`;
    }
  }
  return '';
};

const formatDateTime = (
  date?: string | null,
  options: { month: 'short' | 'long' } = { month: 'long' }
) => {
  if (date) {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      const day = dateObj.toLocaleDateString('en-GB', { day: 'numeric' });
      return `${day}. ${dateObj.toLocaleString('en-GB', {
        month: options.month,
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
  }
  return '';
};

const formatRelativeDateTime = (date?: string | null) => {
  if (date) {
    const dateObj = new Date(date);
    const currentDate = new Date();
    const differenceInMS = currentDate.getTime() - dateObj.getTime();
    const differenceInDays = differenceInMS / (1000 * 3600 * 24);
    const time = dateObj.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (differenceInDays >= 1 && differenceInDays < 2) {
      // Yesterday
      return `Yesterday at ${time}`;
    } else if (differenceInDays > 2 && differenceInDays < 7) {
      // Show day
      return `${dateObj.toLocaleString('en-GB', {
        weekday: 'long',
      })} at ${time}`;
    } else {
      // More than a week since, show normal formatDateTime
      return formatDateTime(date);
    }
  }
  return '';
};

export default { formatDate, formatDateTime, formatRelativeDateTime };
