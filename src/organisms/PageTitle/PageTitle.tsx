import { FC, ReactNode, useEffect } from 'react';

import { environment } from 'src/atoms/utils';

interface PageTitleProps {
  title: string;
  children: ReactNode;
}

const APP_NAME = environment.getAppName(import.meta.env.VITE_NAME);

export const PageTitle: FC<PageTitleProps> = ({ title, children }) => {
  useEffect(() => {
    const newTitle = `${APP_NAME} - ${title}`;
    if (document.title !== newTitle) {
      document.title = newTitle;
      /* v8 ignore next */
    }
  }, [title]);

  return children;
};
