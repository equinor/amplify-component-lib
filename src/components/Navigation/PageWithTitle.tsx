import { FC, ReactNode, useEffect } from 'react';

interface RouteWithTitleProps {
  title: string;
  children: ReactNode;
}

const PageWithTitle: FC<RouteWithTitleProps> = ({ children, title }) => {
  useEffect(() => {
    if (document.title !== title) {
      document.title = title;
    }
  }, [title]);

  return children;
};

export default PageWithTitle;
