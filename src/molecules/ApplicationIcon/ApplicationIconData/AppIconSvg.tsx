import React from 'react';

interface IconSvgProps {
  width?: number;
  height?: number;
  viewBox?: string;
  fill?: string;
  paths: string[];
}

const AppIconSvg: React.FC<IconSvgProps> = ({
  viewBox = '0 0 384 384',
  fill = 'none',
  paths,
}) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={viewBox}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="app-icon-svg"
    >
      {paths.map((d, index) => (
        <path
          key={index}
          d={d}
          fillRule="evenodd"
          clipRule="evenodd"
          fill="white"
        />
      ))}
    </svg>
  );
};

export default AppIconSvg;
