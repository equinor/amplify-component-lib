interface Props {
  currentUrl?: string;
  link: string;
}

const isCurrentUrl = ({ currentUrl, link }: Props) => {
  const currentIncludesLink = currentUrl?.includes(link) ?? false;

  return (currentIncludesLink && link !== '/') || link === currentUrl;
};

export { isCurrentUrl };
