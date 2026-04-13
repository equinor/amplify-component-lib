export const randomNumBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const hexToRgb = (hex: string) => {
  if (!isHexColor(hex)) {
    throw new Error('Invalid hex color');
  }

  // Normalize hex string to handle short-form (#RGB, #RGBA) as well as long-form
  let normalized = hex.trim();
  // Expand #RGB and #RGBA to #RRGGBB and #RRGGBBAA respectively
  if (normalized.length === 4 || normalized.length === 5) {
    const hexPart = normalized.slice(1);
    const expandedHexPart = hexPart
      .split('')
      .map((ch) => ch + ch)
      .join('');
    normalized = '#' + expandedHexPart;
  }
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  return { r, g, b };
};

export function isHexColor(color: string): boolean {
  // #RGB, #RRGGBB, #RGBA, #RRGGBBAA
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(
    color.trim()
  );
}

export const replaceOpacity = (
  cssValue: string,
  newOpacity: number
): string => {
  // Match rgba(...) inside the string
  const rgbaMatch = cssValue.match(
    /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
  );

  if (!rgbaMatch) {
    throw new Error('Invalid CSS value: RGBA not found');
  }

  const [, r, g, b] = rgbaMatch; // Ignore old opacity
  return `rgba(${r}, ${g}, ${b}, ${newOpacity})`;
};
