import { forwardRef, useMemo } from 'react';

import { Avatar, Icon } from '@equinor/eds-core-react';
import { person } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, shape, typography } = tokens;

const availableColors: string[] = [
  colors.infographic.primary__energy_red_55.rgba,
  colors.infographic.primary__moss_green_55.rgba,
  colors.infographic.substitute__green_mint.rgba,
  colors.infographic.substitute__blue_overcast.rgba,
];

export function nameToInitials(name: string) {
  const nameWithoutParenthesis = name
    .replace(/ *\([^)]*\) */g, '')
    .toUpperCase();
  const splitNames = nameWithoutParenthesis.split(' ');
  const lastNameCommaFirstName = nameWithoutParenthesis.includes(',');

  const getFirstCharacterAfterComma = (name: string) => {
    const nameSplitOnComma = name.split(',');
    return nameSplitOnComma[1].trim().charAt(0);
  };

  if (splitNames.length === 1 && splitNames[0] !== '') {
    return splitNames[0].charAt(0);
  }

  if (lastNameCommaFirstName) {
    return (
      getFirstCharacterAfterComma(nameWithoutParenthesis) +
      splitNames[0].charAt(0)
    );
  }

  if (splitNames.length >= 2) {
    return (
      splitNames[0].charAt(0) + splitNames[splitNames.length - 1].charAt(0)
    );
  }
}

function nameToColor(name?: string): string {
  let sum = 0;
  if (name)
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
  return availableColors[sum % availableColors.length];
}

type InitialsContainerProps = {
  $fontSize: number;
  $size: number;
  $background: string;
  disabled: boolean;
};

const InitialsContainer = styled.div<InitialsContainerProps>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  font-size: ${(props) => props.$fontSize}px;
  font-family: ${typography.heading.h6.fontFamily};
  border-radius: ${shape.circle.borderRadius};
  background: ${(props) =>
    props.disabled
      ? colors.interactive.disabled__border.rgba
      : props.$background};
  color: ${(props) =>
    props.disabled
      ? colors.text.static_icons__default.rgba
      : colors.text.static_icons__primary_white.rgba};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FallbackIcon = styled(Icon)`
  width: 70%;
`;

interface AvatarWrapperProps {
  $size: number;
}

const AvatarWrapper = styled.div<AvatarWrapperProps>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  > div {
    width: inherit;
    height: inherit;
  }
`;

export interface ProfileAvatarProps {
  url?: string;
  name?: string;
  size?: 'small' | 'small-medium' | 'medium' | 'large' | 'x-large' | number;
  disabled?: boolean;
}

const ProfileAvatar = forwardRef<HTMLDivElement, ProfileAvatarProps>(
  ({ url, name, size = 'medium', disabled = false }, ref) => {
    const initials = useMemo(() => {
      const defaultIcon = <FallbackIcon data={person}></FallbackIcon>;
      if (!name || name.trim().length === 0) return defaultIcon;

      return nameToInitials(name);
    }, [name]);

    const sizeToPx = useMemo(() => {
      switch (size) {
        case 'small':
          return 16;
        case 'small-medium':
          return 24;
        case 'medium':
          return 32;
        case 'large':
          return 40;
        case 'x-large':
          return 48;
        default:
          return size;
      }
    }, [size]);

    const sizeToFontsize = useMemo(() => {
      switch (size) {
        case 'small':
          return 6;
        case 'small-medium':
          return 10;
        case 'medium':
          return 14;
        case 'large':
          return 16;
        case 'x-large':
          return 18;
        default:
          return size / 2;
      }
    }, [size]);

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
        <AvatarWrapper $size={sizeToPx}>
          <Avatar
            alt={`user-avatar-${name}`}
            src={imageSrc}
            disabled={disabled}
            ref={ref}
          />
        </AvatarWrapper>
      );
    }

    return (
      <InitialsContainer
        $background={nameToColor(name)}
        $size={sizeToPx}
        $fontSize={sizeToFontsize}
        disabled={disabled}
        ref={ref}
      >
        {initials}
      </InitialsContainer>
    );
  }
);

ProfileAvatar.displayName = 'ProfileAvatar';
export default ProfileAvatar;
