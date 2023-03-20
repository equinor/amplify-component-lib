import { forwardRef, useMemo } from 'react';

import { Avatar, Icon } from '@equinor/eds-core-react';
import { person } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, shape, typography } = tokens;

const availableColors: string[] = [
  colors.infographic.primary__energy_red_55.hex,
  colors.infographic.primary__moss_green_55.hex,
  colors.infographic.substitute__green_mint.hex,
  colors.infographic.substitute__blue_overcast.hex,
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
}

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
} & ContainerProps;

const InitialsContainer = styled.div<InitialsContainerProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  font-size: ${(props) => props.fontSize}px;
  font-family: ${typography.heading.h6.fontFamily};
  border-radius: ${shape.circle.borderRadius};
  background: ${colors.infographic.substitute__blue_overcast.hex};
  color: ${colors.text.static_icons__primary_white.hex};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FallbackIcon = styled(Icon)`
  width: 70%;
`;

export interface ProfileAvatarProps {
  url?: string;
  name?: string;
  size?: 'small' | 'small-medium' | 'medium' | 'large';
}

const ProfileAvatar = forwardRef<HTMLDivElement, ProfileAvatarProps>(
  ({ url, name, size = 'medium' }, ref) => {
    const initials = useMemo(() => {
      const defaultIcon = <FallbackIcon data={person}></FallbackIcon>;
      if (!name || name.trim().length === 0) return defaultIcon;

      return nameToInitials(name);
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
          ref={ref}
        />
      );
    }

    return (
      <InitialsContainer
        background={nameToColor(name)}
        size={sizeToPx()}
        fontSize={sizeToFontsize()}
        ref={ref}
      >
        {initials}
      </InitialsContainer>
    );
  }
);

ProfileAvatar.displayName = 'ProfileAvatar';
export default ProfileAvatar;
