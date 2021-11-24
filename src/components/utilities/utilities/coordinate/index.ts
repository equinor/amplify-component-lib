// Works for both latitude and longitude values
function formatLatLng(coordinate: number, isLatitude: boolean): string {
  // Example of number coming in: 58.252376489275
  const strings = coordinate.toString().split('.');
  try {
    const degrees = Math.abs(Number(strings[0])).toString().padStart(3, '0');
    const minutes = strings[1].substr(0, 2).padEnd(2, '0');
    let seconds = strings[1].substr(2, strings[1].length).padEnd(4, '0');
    // Decimal for seconds
    seconds = `${seconds[0]}${seconds[1]}.${seconds.substr(2, seconds.length)}`;

    let letter: string;

    if (isLatitude) {
      if (Number(strings[0]) < 0) {
        letter = 'S';
      } else {
        letter = 'N';
      }
    } else {
      if (Number(strings[0]) < 0) {
        letter = 'W';
      } else {
        letter = 'E';
      }
    }
    return `${letter} ${degrees}° ${minutes}' ${seconds}"`;
  } catch (e) {
    throw new Error(`${e} number must be on format xx.xxxxxx`);
  }
}

function formatUtm(coordinate: number, decimals = 2): string {
  const strings = coordinate.toString().split('.');
  return `${strings[0]}.${strings[1].substr(0, decimals)}m`;
}

export default { formatLatLng, formatUtm };
