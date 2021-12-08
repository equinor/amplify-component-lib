import React, { FC, useEffect, useRef, useState } from 'react';
import { Icon, Typography } from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import styled, { keyframes } from 'styled-components';
import { delay } from 'lodash-es';

const { colors, spacings } = tokens;

const Wrapper = styled.div`
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const spawn = keyframes`
  from {
    opacity: 0;
    background: none;
  }

  to {
    opacity: 1;
    background: ${colors.ui.background__light.hex};
  }
`;

interface CopyIconProps {
  iconRightPos?: string;
}

const CopyIcon = styled.div<CopyIconProps>`
  position: absolute;
  z-index: 1000;
  right: ${(props) => props.iconRightPos && props.iconRightPos};
  top: 50%;
  transform: translate(0, -50%);
  animation: ${spawn} 1s;
  background: ${colors.ui.background__light.hex};
  p,
  svg {
    color: ${colors.interactive.primary__hover.hex};
  }
  p {
    font-weight: 700;
    margin-top: 2px;
  }
  display: grid;
  grid-template-columns: auto 2.75rem;
  grid-gap: ${spacings.comfortable.xx_small};
  align-items: center;
`;

type IconText = 'Copy' | 'Copied!';

export interface CopyTextProps {
  textToCopy: string;
  iconRightPos?: string;
}

const CopyText: FC<CopyTextProps> = ({
  children,
  textToCopy,
  iconRightPos,
}) => {
  const isMounted = useRef(false);
  const [hovering, setHovering] = useState(false);
  const [iconText, setIconText] = useState<IconText>('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIconText('Copied!');
    delay(() => {
      if (isMounted.current) {
        setIconText('Copy');
      }
    }, 3000);
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Wrapper
      data-testid="copyTextWrapper"
      onClick={handleCopy}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
      {hovering && (
        <CopyIcon iconRightPos={iconRightPos}>
          <Icon data={copy} size={16} />
          <Typography variant="overline">{iconText}</Typography>
        </CopyIcon>
      )}
    </Wrapper>
  );
};

export default CopyText;
