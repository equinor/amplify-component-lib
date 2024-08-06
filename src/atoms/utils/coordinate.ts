// Works for both latitude and longitude values
export function formatLatLng(coordinate: number): string {
  // Example of number coming in: 58.252376489275
  const strings = coordinate.toString().split('.');
  return `${strings[0]}.${strings[1].substring(0, 7)}`;
}

export function formatUtm(coordinate: number, decimals = 2): string {
  const strings = coordinate.toString().split('.');
  return `${strings[0]}.${strings[1].substring(0, decimals)}m`;
}
