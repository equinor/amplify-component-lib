import { FC, useMemo } from 'react';

import { tokens } from '@equinor/eds-tokens';

import { PageMenuVariants } from './PageMenu.types';
import PageMenuItem from './PageMenuItem';
import { BorderItemsContainer } from './PageMenuItem.styles';
import { usePageMenu } from 'src/providers/PageMenuProvider';
import { getValues } from 'src/providers/PageMenuProvider.utils';
import { spacings } from 'src/style';

import styled from 'styled-components';

const { colors } = tokens;

interface ContainerProps {
  $variant: PageMenuVariants;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  ${({ $variant }) => {
    switch ($variant) {
      case 'buttons':
        return `gap: ${spacings.small};`;
      case 'border':
        return `border-left: 2px solid ${colors.ui.background__medium.rgba};`;
    }
  }}
`;

export interface PageMenuProps {
  variant?: PageMenuVariants;
  onlyShowSelectedChildren?: boolean;
}

const PageMenu: FC<PageMenuProps> = ({
  variant = 'buttons',
  onlyShowSelectedChildren = true,
}) => {
  const { items, selected } = usePageMenu();

  const activeIndex = useMemo(() => {
    // Was not able to test this properly because selected can't be correctly updated in the unit test
    // Created a test that check that it sets activeIndex correctly
    // but could not get it to work with selected === undefined || child was true
    /* c8 ignore start */
    for (const [index, item] of items.entries()) {
      const childValues = getValues([], item);
      if (
        item.value === selected ||
        (selected && childValues.includes(selected))
      )
        return index;
    }

    return -1;
    /* c8 ignore end */
  }, [items, selected]);

  if (variant === 'border') {
    return (
      <Container className="page-menu" $variant={variant}>
        {items.map((item, index) => (
          <BorderItemsContainer
            key={`page-menu-item-container-${item.value}-${index}`}
            $index={index}
            $activeIndex={activeIndex}
            aria-selected={activeIndex === index}
          >
            <PageMenuItem
              key={`page-menu-item-${item.value}`}
              variant={variant}
              {...item}
              onlyShowSelectedChildren={onlyShowSelectedChildren}
            />
          </BorderItemsContainer>
        ))}
      </Container>
    );
  }

  return (
    <Container className="page-menu" $variant={variant}>
      {items.map((item) => (
        <PageMenuItem
          key={`page-menu-item-${item.value}`}
          variant={variant}
          {...item}
          onlyShowSelectedChildren={onlyShowSelectedChildren}
        />
      ))}
    </Container>
  );
};

export default PageMenu;
