interface CanNavigateArgs {
  isActive: boolean;
  disabled: boolean;
  replace: boolean;
}

export const canNavigate = ({
  isActive,
  disabled,
  replace,
}: CanNavigateArgs) => {
  return !disabled && (!isActive || (isActive && replace));
};
