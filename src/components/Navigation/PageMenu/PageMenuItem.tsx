import { FC, useMemo } from 'react';

import { Button, Container } from './PageMenuItem.styles';
import { PageMenuVariants } from 'src/components/Navigation/PageMenu/PageMenu.types';
import { PageMenuItemType, usePageMenu } from 'src/providers/PageMenuProvider';

interface PageMenuItemProps extends PageMenuItemType {
  onlyShowSelectedChildren: boolean;
  variant: PageMenuVariants;
  layer?: number;
}

const PageMenuItem: FC<PageMenuItemProps> = ({
  label,
  value,
  disabled = false,
  children,
  variant,
  onlyShowSelectedChildren,
  layer = 0,
}) => {
  const { isActive, setSelected } = usePageMenu();

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
            <PageMenuItem
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

export default PageMenuItem;
