import { FC, MouseEvent, useMemo } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { arrow_forward, external_link, IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacings.x_small};
  > span {
    padding: ${spacings.small} ${spacings.x_small};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${spacings.medium_small};
  text-decoration: none;
  gap: ${spacings.medium};
  cursor: pointer;

  &:hover {
    background-color: ${colors.interactive.primary__hover_alt.rgba};
  }
`;

interface ResourceMenuItemProps {
  text: string;
  icon: IconData;
  onClick: (event?: MouseEvent<HTMLDivElement>) => void;
  id?: string;
  lastItem?: boolean;
  isHref?: boolean;
}

const ResourceMenuItem: FC<ResourceMenuItemProps> = ({
  text,
  icon,
  isHref,
  onClick,
  id,
  lastItem = false,
}) => {
  return useMemo(() => {
    return (
      <Wrapper id={id} onClick={onClick} role="menuitem">
        <ContentInfo>
          <Icon
            data={icon}
            size={24}
            color={colors.interactive.primary__resting.rgba}
          />
          <Typography group="navigation" variant="menu_title" as="span">
            {text}
          </Typography>
        </ContentInfo>
        {!lastItem && (
          <Icon
            data={isHref ? external_link : arrow_forward}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
        )}
      </Wrapper>
    );
  }, [icon, id, isHref, lastItem, onClick, text]);
};

export default ResourceMenuItem;
