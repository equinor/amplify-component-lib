import { FC, ReactNode, useEffect } from 'react';

import { environment } from 'src/atoms/utils';

interface PageTitleProps {
  title: string;
  children: ReactNode;
}

const APP_NAME = environment.getAppName(import.meta.env.VITE_NAME);

export const PageTitle: FC<PageTitleProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = `${APP_NAME} - ${title}`;
  }, [title]);

  return children;
};
