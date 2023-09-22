import { FC, MouseEvent, useMemo } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { arrow_forward, external_link, IconData } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings } = tokens;

const HrefLink = styled.a`
  text-decoration: none;
`;

const ContentInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacings.comfortable.medium_small};
  padding-right: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 8px;
  text-decoration: none;
  gap: ${spacings.comfortable.medium};
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }
`;

interface HelpMenuItemProps {
  text: string;
  icon: IconData;
  onClick: (event?: MouseEvent<HTMLDivElement>) => void;
  id?: string;
  href?: string;
}

const HelpMenuItem: FC<HelpMenuItemProps> = ({
  text,
  icon,
  href,
  onClick,
  id,
}) => {
  const isHref = href && href.length > 0;

  const content = useMemo(() => {
    return (
      <Wrapper id={id} onClick={onClick}>
        <ContentInfo>
          <Icon
            data={icon}
            size={24}
            color={colors.interactive.primary__resting.hsla}
          />
          <Typography group="navigation" variant="menu_title" as="span">
            {text}
          </Typography>
        </ContentInfo>

        <Icon
          data={isHref ? external_link : arrow_forward}
          size={24}
          color={colors.interactive.primary__resting.hsla}
        />
      </Wrapper>
    );
  }, [icon, id, isHref, onClick, text]);

  if (isHref) {
    return (
      <HrefLink href={href} target="_blank" as="a">
        {content}
      </HrefLink>
    );
  }

  return content;
};

export default HelpMenuItem;
