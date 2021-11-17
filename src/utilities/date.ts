import { isNaN } from 'lodash';

const formatDate = (date?: string | null) => {
  if (date) {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      // getMonth()+1 because January is 0 and so on
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

const formatDateTime = (date?: string | null) => {
  if (date) {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      const day = dateObj.toLocaleDateString('en-GB', { day: 'numeric' });
      return `${day}. ${dateObj.toLocaleString('en-GB', {
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}`;
    }
  }
  return '';
};

export default { formatDate, formatDateTime };
