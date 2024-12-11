import { FC } from 'react';

import { AppIconData } from 'src/molecules/ApplicationIcon/ApplicationIconNew/ApplicationIconNewData/ApplicationIconNewCollection';

interface IconSvgProps {
  paths: AppIconData['svgPathData'];
}

export const AppIconSvg: FC<IconSvgProps> = ({ paths }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 384 384"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="app-icon-svg"
  >
    {paths.map((d, index) =>
      typeof d === 'string' ? (
        <path
          key={index}
          data-testid="app-icon-path"
          d={d}
          fillRule="evenodd"
          clipRule="evenodd"
          fill="white"
        />
      ) : (
        <path
          key={index}
          data-testid="app-icon-path"
          d={d.path}
          fillOpacity={d.opacity}
          fillRule="evenodd"
          clipRule="evenodd"
          fill="white"
        />
      )
    )}
  </svg>
);
