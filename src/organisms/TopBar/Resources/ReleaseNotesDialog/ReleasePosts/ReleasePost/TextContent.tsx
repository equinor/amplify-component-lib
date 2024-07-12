import { FC } from 'react';

import { useTokenReleaseNote } from '../hooks/useTokenReleaseNote';
import { RichTextDisplay } from 'src/molecules/RichTextDisplay/RichTextDisplay';

interface TextContentProps {
  text: string;
}

export const TextContent: FC<TextContentProps> = ({ text }) => {
  const { data: token } = useTokenReleaseNote();

  return <RichTextDisplay value={text} imgReadToken={token} />;
};
