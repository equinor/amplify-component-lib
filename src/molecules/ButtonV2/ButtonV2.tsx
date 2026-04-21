import { ButtonHTMLAttributes, FC, RefObject } from 'react';

import { DotProgress, Icon } from '@equinor/eds-core-react';
import { IconData } from '@equinor/eds-icons';
import type { LinkComponent } from '@tanstack/react-router';
import { createLink } from '@tanstack/react-router';

import { BaseButton } from './Button.styles';
import { getLoadingColor } from './Button.utils';
import { TOKEN_MAPPINGS } from './tokens';

import { styled } from 'styled-components';

const HiddenText = styled.span`
  opacity: 0;
  visibility: hidden;
`;

const CenteredContent = styled.span`
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type ButtonV2Props = {
  color?: 'primary' | 'danger';
  variant?: 'filled' | 'outlined' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  ref?: RefObject<HTMLButtonElement>;
  leadingIcon?: IconData;
  trailingIcon?: IconData;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LeftIcon = styled(Icon)`
  left: 0;
`;

const RightIcon = styled(Icon)`
  right: 0;
`;

export const ButtonV2: FC<ButtonV2Props> = ({
  children,
  variant = 'filled',
  color = 'primary',
  leadingIcon = undefined,
  trailingIcon = undefined,
  fullWidth = false,
  loading = false,
  ...rest
}) => {
  const tokens = TOKEN_MAPPINGS[color][variant];

  return (
    <BaseButton $tokens={tokens} $fullWidth={fullWidth} {...rest}>
      {loading ? (
        <>
          <HiddenText>{children}</HiddenText>
          <CenteredContent>
            <DotProgress color={getLoadingColor({ color, variant })} />
          </CenteredContent>
        </>
      ) : (
        <>
          {leadingIcon && <LeftIcon data={leadingIcon} />}
          <span>{children}</span>
          {trailingIcon && (
            <RightIcon style={{ right: 0 }} data={trailingIcon} />
          )}
        </>
      )}
    </BaseButton>
  );
};

const CreatedButtonLinkComponent = createLink(ButtonV2);

export const CustomButtonLink: LinkComponent<typeof ButtonV2> = (props) => {
  return <CreatedButtonLinkComponent {...props} />;
};
