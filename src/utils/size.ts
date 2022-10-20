const k = 1024; // using decimal to give a more realistic value from blobStorage

const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes < 0) return '0 Bytes';
  if (bytes === 0) return '0 Bytes';
  if (bytes === 1) return '1 Byte';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatKiloBytes = (kiloBytes: number, decimals = 2): string => {
  return formatBytes(kiloBytes * k, decimals);
};

export default { formatBytes, formatKiloBytes };
