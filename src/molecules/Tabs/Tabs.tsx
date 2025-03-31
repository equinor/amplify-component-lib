import { HTMLAttributes, Ref, useEffect, useRef, useState } from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import { chevron_left, chevron_right } from '@equinor/eds-icons';

import { Tab } from './Tab';
import { spacings } from 'src/atoms/style';
import { Tabs as TabsType } from 'src/molecules/Tabs/Tabs.types';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.small};
  > button {
    flex-shrink: 0;

    &:last-child {
      order: 2;
    }
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  overflow: hidden;
  order: 1;
`;

export type TabsProps<T> = TabsType<T> & {
  ref?: Ref<HTMLDivElement>;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

/**
 * @param selected - The selected value of the option
 * @param options - Array of available options, must be 2 or more
 * @param centered - If text in each tab is centered, defaults to true
 * @param animated - If switching tab is animated, defaults to true
 * @param scrollable - If tab should be scrollable, defaults to true. Only shows scroll buttons if the tabs don't fit
 * @param amountPerScrollPage - How many tabs should be on each scroll page. When undefined the component fits tabs by tab content
 * @param onChange - Callback when tab is selected
 * @param ref - Container ref
 */
export function Tabs<T>({
  options,
  selected,
  centered = true,
  animated = true,
  scrollable = true,
  amountPerScrollPage,
  onChange,
  ref,
  ...rest
}: TabsProps<T>) {
  const tabContainer = useRef<HTMLDivElement | null>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollLeftDisabled, setScrollLeftDisabled] = useState(true);
  const [scrollRightDisabled, setScrollRightDisabled] = useState(true);

  if (amountPerScrollPage !== undefined && amountPerScrollPage <= 0) {
    throw new Error(
      '[ACL - Tabs]: Amount per scroll page must be greater than 0'
    );
  }

  if (amountPerScrollPage !== undefined && !scrollable) {
    throw new Error(
      '[ACL - Tabs]: amountPerScrollPage was set but scrollable is false!'
    );
  }

  const selectedIndex = options.findIndex(
    (option) => option.value === selected
  );

  useEffect(() => {
    if (!scrollable || !tabContainer.current) {
      if (showScrollButtons) setShowScrollButtons(false);
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      const element = entry.target;
      setContainerWidth(Math.round(entry.borderBoxSize[0].inlineSize));
      setShowScrollButtons(element.scrollWidth > element.clientWidth);
      element.scrollTo(0, 0);
    });
    observer.observe(tabContainer.current, { box: 'border-box' });
    setScrollLeftDisabled(true);
    setScrollRightDisabled(false);
    return () => {
      observer.disconnect();
    };
  }, [scrollable, showScrollButtons]);

  const handleScroll = (direction: 'left' | 'right') => () => {
    /* v8 ignore next */
    if (!tabContainer.current || !containerWidth) return;
    let scrollLeft = tabContainer.current.scrollLeft;
    if (direction === 'left') {
      scrollLeft -= containerWidth;
      scrollLeft = Math.max(0, scrollLeft);
    } else {
      scrollLeft += containerWidth;
      scrollLeft = Math.min(scrollLeft, tabContainer.current.scrollWidth);
    }
    tabContainer.current.scrollTo({
      top: 0,
      left: scrollLeft,
      behavior: 'smooth',
    });
    setScrollLeftDisabled(scrollLeft <= 0);
    setScrollRightDisabled(
      scrollLeft + containerWidth >= tabContainer.current.scrollWidth
    );
  };

  return (
    <Container {...rest} ref={ref}>
      <Content
        ref={tabContainer}
        style={
          amountPerScrollPage && showScrollButtons
            ? {
                display: 'grid',
                gridTemplateColumns: `repeat(${options.length}, ${containerWidth / amountPerScrollPage}px)`,
              }
            : undefined
        }
      >
        {options.map((option, index) => (
          <Tab
            key={option.label}
            selectedIndex={selectedIndex}
            index={index}
            onChange={onChange}
            centered={centered}
            animated={animated}
            {...option}
          />
        ))}
      </Content>
      {showScrollButtons ? (
        <>
          <Button
            aria-label="Scroll tabs left"
            variant="ghost_icon"
            disabled={scrollLeftDisabled}
            onClick={handleScroll('left')}
          >
            <Icon data={chevron_left} />
          </Button>
          <Button
            aria-label="Scroll tabs right"
            variant="ghost_icon"
            disabled={scrollRightDisabled}
            onClick={handleScroll('right')}
          >
            <Icon data={chevron_right} />
          </Button>
        </>
      ) : null}
    </Container>
  );
}
