import { FC, ReactNode, useEffect } from 'react';

interface PageWithTitleProps {
  title: string;
  children: ReactNode;
}

export const PageWithTitle: FC<PageWithTitleProps> = ({ children, title }) => {
  useEffect(() => {
    if (document.title !== title) {
      document.title = title;
    }
  }, [title]);

  return children;
};
