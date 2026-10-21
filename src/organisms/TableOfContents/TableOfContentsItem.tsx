import { FC, useMemo } from 'react';

import {
  Button,
  ChildContainer,
  TableOfContentsItemContainer,
} from './TableOfContents.styles';
import { Badge } from 'src/molecules/Badge/Badge';
import {
  TableOfContentsItemType,
  useTableOfContents,
} from 'src/providers/TableOfContentsProvider';

import { AnimatePresence } from 'motion/react';

interface TableOfContentsItemProps extends TableOfContentsItemType {
  onlyShowSelectedChildren: boolean;
  maxLines?: number;
  activeParent?: boolean;
}

export const TableOfContentsItem: FC<TableOfContentsItemProps> = ({
  label,
  value,
  count,
  disabled = false,
  children,
  onlyShowSelectedChildren,
  maxLines,
}) => {
  const { isActive, selected, setSelected } = useTableOfContents();

  const active = useMemo(
    () => isActive({ label, value, children }) && !disabled,
    [children, disabled, isActive, label, value]
  );

  const handleOnClick = () => {
    if (!disabled && selected !== value) setSelected(value);
  };

  const shouldShowChildren: boolean =
    (onlyShowSelectedChildren && active) || !onlyShowSelectedChildren;

  return (
    <TableOfContentsItemContainer layoutScroll layoutRoot>
      <Button
        $active={selected === value}
        onClick={handleOnClick}
        disabled={disabled}
        $maxLines={maxLines}
      >
        <span title={label}>
          <span className="label">{label}</span>
        </span>
        {count !== undefined && (
          <Badge variant={disabled ? 'empty' : 'light'} value={count} />
        )}
      </Button>
      <AnimatePresence>
        {children && shouldShowChildren && (
          <ChildContainer
            initial={{ height: 0 }}
            animate={{
              height: 'auto',
            }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children.map((child) => (
              <TableOfContentsItem
                key={child.value}
                onlyShowSelectedChildren={onlyShowSelectedChildren}
                maxLines={maxLines}
                {...child}
              />
            ))}
          </ChildContainer>
        )}
      </AnimatePresence>
    </TableOfContentsItemContainer>
  );
};
