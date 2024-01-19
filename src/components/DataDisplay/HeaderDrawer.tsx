import {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { chevron_down, chevron_up } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

const { colors, elevation, shape } = tokens;
import { spacings } from 'src/style';

const Content = styled(motion.div)`
  overflow: hidden;
`;

const Header = styled.button`
  display: flex;
  gap: ${spacings.medium};
  width: fit-content;
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    > div {
      box-shadow: ${elevation.overlay};
    }
  }
`;

const IconWrapper = styled.div`
  transition: box-shadow 200ms;
  box-shadow: ${elevation.raised};
  display: flex;
  align-items: center;
  border-radius: ${shape.circle.borderRadius};
`;

export interface HeaderDrawerProps extends HTMLAttributes<'h6'> {
  title: string;
  children: ReactNode;
  openByDefault?: boolean;
}

const HeaderDrawer = forwardRef<HTMLHeadingElement, HeaderDrawerProps>(
  ({ title, openByDefault = false, id, children }, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(openByDefault);
    const initialHeight = useRef<number | string>(
      openByDefault ? 'fit-content' : 0
    );

    useEffect(() => {
      if (initialHeight.current === 'fit-content' && !isOpen) {
        initialHeight.current = 0;
      }
    }, [isOpen]);

    return (
      <div>
        <Header onClick={() => setIsOpen((o) => !o)}>
          <Typography variant="h6" ref={ref} id={id}>
            {title}
          </Typography>
          <IconWrapper>
            <Icon
              data={isOpen ? chevron_up : chevron_down}
              color={colors.interactive.primary__resting.rgba}
            />
          </IconWrapper>
        </Header>
        <AnimatePresence>
          {isOpen && (
            <Content
              initial={{ height: initialHeight.current }}
              animate={{ height: 'fit-content' }}
              exit={{ height: 0 }}
            >
              {children}
            </Content>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

HeaderDrawer.displayName = 'HeaderDrawer';

export default HeaderDrawer;
