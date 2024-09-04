interface Props {
  currentUrl?: string;
  link: string;
  replace: boolean;
  /**
   * This is useful for routes that drills into a path,
   * by still highlighting the original path and not disable "back to start" by click on the same link again
   * eg. navigating to /collections and clicking on an item to go into /collections/:id and so on
   */
  hasPathDrilling: boolean;
}

const isCurrentUrl = ({
  currentUrl,
  link,
  replace,
  hasPathDrilling,
}: Props) => {
  if (replace) {
    if (hasPathDrilling) {
      return currentUrl?.includes(link) ?? false;
    }
    return typeof currentUrl === 'string' && currentUrl === link;
  }
  return currentUrl?.includes(link) ?? false;
};

export { isCurrentUrl };
