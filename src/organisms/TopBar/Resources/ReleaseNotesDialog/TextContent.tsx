import { FC } from 'react';

import { useTokenReleaseNote } from './ReleasePosts/hooks/useTokenReleaseNote';
import { RichTextDisplay } from 'src/molecules';

interface TextContentProps {
  text: string;
}

export const TextContent: FC<TextContentProps> = ({ text }) => {
  const { data: token } = useTokenReleaseNote();

  return <RichTextDisplay value={text} imgReadToken={token} />;
};
