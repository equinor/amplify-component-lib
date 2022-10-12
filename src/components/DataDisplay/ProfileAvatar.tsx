import { forwardRef, useMemo } from 'react';

import { Avatar as EDSAvatar } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, shape, spacings, typography } = tokens;

const availableColors: string[] = [
  colors.infographic.primary__energy_red_55.hex,
  colors.infographic.primary__moss_green_55.hex,
  colors.infographic.substitute__green_mint.hex,
  colors.infographic.substitute__blue_overcast.hex,
];

function nameToColor(name?: string): string {
  let sum = 0;
  if (name)
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
  return availableColors[sum % availableColors.length];
}

type ContainerProps = {
  size: number;
};

type InitialsContainerProps = {
  background: string;
  fontSize: number;
  disabled: boolean;
} & ContainerProps;

const InitialsContainer = styled.div<InitialsContainerProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  font-size: ${(props) => props.fontSize}px;
  font-family: ${typography.heading.h6.fontFamily};
  font-weight: ${typography.heading.h1_bold.fontWeight};
  border-radius: ${shape.circle.borderRadius};
  background: ${(props) =>
    props.disabled
      ? colors.interactive.disabled__border.hex
      : props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${spacings.comfortable.medium};
`;

const Avatar = styled(EDSAvatar)`
  ${(props) =>
    props.disabled &&
    `
    > img {
      filter: grayscale(1);
    }
  `}
  margin-right: ${spacings.comfortable.medium};
`;

export interface ProfileAvatarProps {
  url?: string;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const ProfileAvatar = forwardRef<HTMLDivElement, ProfileAvatarProps>(
  ({ url, name, size = 'medium', disabled = false }, ref) => {
    const initials = useMemo((): [string, string] => {
      const split = name?.split(' ');
      const firstName: string = split?.at(0) ?? 'KARI';
      const lastName: string = split?.at(split?.length - 1) ?? 'NORDMANN';
      return [firstName[0].toUpperCase(), lastName[0].toUpperCase()];
    }, [name]);

    const sizeToPx = () => {
      if (size === 'small') return 16;
      else if (size === 'medium') return 32;
      return 40;
    };

    const sizeToFontsize = () => {
      if (size === 'small') return 6;
      else if (size === 'medium') return 10;
      return 16;
    };

    const imageSrc = useMemo((): string => {
      const { btoa, atob } = window;

      if (url) {
        try {
          if (btoa(atob(url)) === url) {
            return `data:image/png;base64, ${url}`;
          }
        } catch {
          return url;
        }
      }
      return '';
    }, [url]);

    if (imageSrc !== '') {
      return (
        <Avatar
          alt={`user-avatar-${name}`}
          size={sizeToPx()}
          src={imageSrc}
          disabled={disabled}
          ref={ref}
        />
      );
    }

    return (
      <InitialsContainer
        background={nameToColor(name)}
        size={sizeToPx()}
        fontSize={sizeToFontsize()}
        disabled={disabled}
        ref={ref}
      >
        {initials.join('')}
      </InitialsContainer>
    );
  }
);

ProfileAvatar.displayName = 'ProfileAvatar';
export default ProfileAvatar;
