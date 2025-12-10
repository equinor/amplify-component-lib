export function cleanStatusText(activeFeature: string) {
  return activeFeature.split('-key')[0];
}
