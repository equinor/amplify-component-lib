import { FC } from 'react';

import { Icon, IconProps, Typography } from '@equinor/eds-core-react';

import {
  ApplicationIconWithIconProps,
  ApplicationIconWithNameProps,
} from './ApplicationIconBase';
import { nameToAcronym } from 'src/molecules/ApplicationIcon/ApplicationIcon.utils';

export const ApplicationIconContent: FC<
  | Pick<ApplicationIconWithIconProps, 'size' | 'iconData'>
  | Pick<ApplicationIconWithNameProps, 'size' | 'name'>
> = ({ size, ...rest }) =>
  'iconData' in rest ? (
    Array.isArray(rest.iconData) ? (
      rest.iconData.map((icon, index) => (
        <Icon
          key={`icon-${index}`}
          data-testid={`icon-part-${index}`}
          data={icon}
          size={size as IconProps['size']}
          color={icon.color}
        />
      ))
    ) : (
      <Icon
        data={rest.iconData}
        size={size as IconProps['size']}
        color="#ffffff"
      />
    )
  ) : (
    <Typography style={{ fontSize: size / 2 }}>
      {nameToAcronym(rest.name)}
    </Typography>
  );
