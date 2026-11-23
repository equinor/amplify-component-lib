import { FC, useLayoutEffect, useRef, useState } from 'react';

import { Background, Group, Text } from './SvgTooltip.styles';

const PADDING = 8;
const MIN_WIDTH = 56;

export interface SvgTooltipProps {
  /** Top left corner (x) of the tooltip in the coordinate system of the parent svg */
  x: number;
  /** Top left corner (y) of the tooltip in the coordinate system of the parent svg */
  y: number;
  title?: string;
}

/**
 * Tooltip drawn with native SVG elements. Must be rendered inside an `<svg>`.
 * The caller decides where it is placed and when it is rendered.
 */
export const SvgTooltip: FC<SvgTooltipProps> = ({ x, y, title }) => {
  const textRef = useRef<SVGTextElement>(null);
  const [textSize, setTextSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const box = textRef.current?.getBBox();
    if (!box) return;
    setTextSize({ width: box.width, height: box.height });
  }, [title]);

  if (!title) return null;

  const width = Math.max(MIN_WIDTH, textSize.width + PADDING * 2);
  const height = textSize.height + PADDING * 2;

  return (
    <Group
      role="tooltip"
      transform={`translate(${x} ${y})`}
      // Hidden until the text has been measured to avoid a flash at the wrong size
      visibility={textSize.width === 0 ? 'hidden' : 'visible'}
    >
      <Background width={width} height={height} />
      <Text ref={textRef} x={width / 2} y={height / 2}>
        {title}
      </Text>
    </Group>
  );
};
