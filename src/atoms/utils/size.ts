const k = 1024; // using decimal to give a more realistic value from blobStorage

/**
 * @deprecated - Use new 'formatDataSize' instead
 */
const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes < 0) return '0 Bytes';
  if (bytes === 0) return '0 Bytes';
  if (bytes === 1) return '1 Byte';

  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * @deprecated - Use new 'formatDataSize' instead
 */
const formatKiloBytes = (kiloBytes: number, decimals = 2): string => {
  return formatBytes(kiloBytes * k, decimals);
};

type InputFormats =
  | 'B'
  | 'KiB'
  | 'MiB'
  | 'GiB'
  | 'TiB'
  | 'PiB'
  | 'EiB'
  | 'ZiB'
  | 'YiB';

interface FormatDataSizeParams {
  size: number;
  decimals?: number;
  inputFormat?: InputFormats;
}

const SIZES: InputFormats[] = [
  'B',
  'KiB',
  'MiB',
  'GiB',
  'TiB',
  'PiB',
  'EiB',
  'ZiB',
  'YiB',
];

/**
 * @param size - Size in whatever the input format is set to
 * @param decimals - Amount of decimals to round to, defaults to 2
 * @param inputFormat - The format that size is in, defaults to 'KiB'
 * @returns - Formatted data size to human readable, i.e. '1024 KiB' = '1 MiB'
 */
function formatDataSize({
  size,
  decimals = 2,
  inputFormat = 'KiB',
}: FormatDataSizeParams): string {
  if (size < 0) {
    throw new Error('Invalid size, must be a positive integer');
  }

  if (decimals < 0) {
    throw new Error('Invalid decimals, must be a positive integer');
  }

  if (size === 0) return `${size} ${inputFormat}`;

  const inputFormatIndex = SIZES.indexOf(inputFormat);
  const multipliedSize = size * Math.pow(1024, inputFormatIndex);

  const index = Math.floor(Math.log(multipliedSize) / Math.log(1024));
  const parsedSize = parseFloat(
    (multipliedSize / Math.pow(1024, index)).toFixed(decimals)
  );
  return `${parsedSize} ${SIZES[index]}`;
}

export default { formatBytes, formatKiloBytes, formatDataSize };
