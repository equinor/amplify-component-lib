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
  border-radius: ${shape.circle.borderRadius};
  background: ${(props) =>
    props.disabled
      ? colors.interactive.disabled__border.hex
      : colors.infographic.substitute__blue_overcast.hex};
  color: ${(props) =>
    props.disabled
      ? colors.text.static_icons__default.hex
      : colors.text.static_icons__primary_white.hex};
  display: flex;
  justify-content: center;
  align-items: center;
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

const getFirstCharacterAfterComma = (name: string) => {
  const nameSplitOnComma = name.split(',');
  return nameSplitOnComma[1].trim().charAt(0);
};

export interface ProfileAvatarProps {
  url?: string;
  name?: string;
  size?: 'small' | 'small-medium' | 'medium' | 'large';
  disabled?: boolean;
}

const ProfileAvatar = forwardRef<HTMLDivElement, ProfileAvatarProps>(
  ({ url, name, size = 'medium', disabled = false }, ref) => {
    const initials = useMemo(() => {
      const defaultName = 'XX';
      if (!name) return defaultName;

      const nameWithoutParenthesis = name
        .replace(/ *\([^)]*\) */g, '')
        .toUpperCase();
      const splitNames = nameWithoutParenthesis.split(' ');
      const lastNameCommaFirstName = nameWithoutParenthesis.includes(',');

      if (splitNames.length === 1 && splitNames[0] !== '') {
        return splitNames[0].charAt(0) + '.';
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

      return defaultName;
    }, [name]);

    const sizeToPx = () => {
      if (size === 'small') return 16;
      else if (size === 'small-medium') return 24;
      else if (size === 'medium') return 32;
      return 40;
    };

    const sizeToFontsize = () => {
      if (size === 'small') return 6;
      else if (size === 'small-medium') return 10;
      else if (size === 'medium') return 14;
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
        {initials}
      </InitialsContainer>
    );
  }
);

ProfileAvatar.displayName = 'ProfileAvatar';
export default ProfileAvatar;
