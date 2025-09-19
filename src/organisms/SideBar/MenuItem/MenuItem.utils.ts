interface IsUrlArgs {
  currentUrl: string;
  link: string;
}

export const isCurrentUrl = ({ currentUrl, link }: IsUrlArgs) => {
  const currentIncludesLink = currentUrl.includes(link);

  return (currentIncludesLink && link !== '/') || link === currentUrl;
};

const isExactUrl = ({ currentUrl, link }: IsUrlArgs) => {
  const currentWithoutParams = currentUrl.split('?')[0];
  return currentWithoutParams === link;
};

interface CanNavigateArgs extends IsUrlArgs {
  disabled: boolean;
  replace: boolean;
}

export const canNavigate = ({
  currentUrl,
  link,
  disabled,
  replace,
}: CanNavigateArgs) => {
  const isCurrent = isCurrentUrl({ currentUrl, link });
  const isExact = isExactUrl({ currentUrl, link });

  return !disabled && (!isCurrent || (isCurrent && !isExact && replace));
};
