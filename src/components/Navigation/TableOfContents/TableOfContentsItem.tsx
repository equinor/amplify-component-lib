import { FC, useMemo } from 'react';

import {
  Button,
  Container,
} from 'src/components/Navigation/TableOfContents/TableOfContents.styles';
import { TableOfContentsVariants } from 'src/components/Navigation/TableOfContents/TableOfContents.types';
import {
  TableOfContentsItemType,
  useTableOfContents,
} from 'src/providers/TableOfContentsProvider';

interface TableOfContentsItemProps extends TableOfContentsItemType {
  onlyShowSelectedChildren: boolean;
  variant: TableOfContentsVariants;
  layer?: number;
}

const TableOfContentsItem: FC<TableOfContentsItemProps> = ({
  label,
  value,
  disabled = false,
  children,
  variant,
  onlyShowSelectedChildren,
  layer = 0,
}) => {
  const { isActive, setSelected } = useTableOfContents();

  const active = useMemo(
    () => isActive({ label, value, children }, variant) && !disabled,
    [children, disabled, isActive, label, value, variant]
  );

  const handleOnClick = () => {
    if (!active && !disabled) setSelected(value);
  };

  if (children) {
    return (
      <Container $layer={layer} $variant={variant}>
        <Button
          $active={active}
          $variant={variant}
          onClick={handleOnClick}
          disabled={active || disabled}
          title={label}
        >
          {label}
        </Button>
        {((onlyShowSelectedChildren && active) || !onlyShowSelectedChildren) &&
          children.map((child) => (
            <TableOfContentsItem
              key={`${value}-child-${child.value}`}
              onlyShowSelectedChildren={onlyShowSelectedChildren}
              layer={layer + 1}
              variant={variant}
              {...child}
            />
          ))}
      </Container>
    );
  }

  return (
    <Button
      $active={active}
      $variant={variant}
      onClick={handleOnClick}
      disabled={active || disabled}
      title={label}
    >
      {label}
    </Button>
  );
};

export default TableOfContentsItem;
