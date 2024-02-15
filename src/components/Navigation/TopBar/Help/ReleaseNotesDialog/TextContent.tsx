import { FC, useCallback } from 'react';
import ReactMarkdown, {
  defaultUrlTransform,
  UrlTransform,
} from 'react-markdown';

import { tokens } from '@equinor/eds-tokens';

import { useTokenReleaseNote } from './ReleasePosts/hooks/useTokenReleaseNote';

import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';

const { colors, typography } = tokens;

const StyledReactMarkdown = styled(ReactMarkdown)`
  p {
    font-size: ${typography.paragraph.body_long.fontSize};
    font-weight: ${typography.paragraph.body_long.fontWeight};
    line-height: ${typography.paragraph.body_long.lineHeight};
    color: ${colors.text.static_icons__default.rgba};
    font-family: ${typography.paragraph.body_long.fontFamily};
  }
  h1 {
    font-size: ${typography.heading.h4.fontSize};
    font-weight: ${typography.heading.h4.fontWeight};
    line-height: ${typography.heading.h4.lineHeight};
    color: ${colors.text.static_icons__default.rgba};
    font-family: ${typography.heading.h4.fontFamily};
  }
  h2 {
    font-size: ${typography.heading.h5.fontSize};
    font-weight: ${typography.heading.h5.fontWeight};
    line-height: ${typography.heading.h5.lineHeight};
    color: ${colors.text.static_icons__default.rgba};
    font-family: ${typography.heading.h5.fontFamily};
  }
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
  }
`;

interface TextContentProps {
  text: string;
}

const TextContent: FC<TextContentProps> = ({ text }) => {
  const { data: token } = useTokenReleaseNote();

  const transformUrl = useCallback<UrlTransform>(
    (url) => {
      const transformed = `${defaultUrlTransform(url)}?${token}`;

      return transformed;
    },
    [token]
  );

  return (
    <StyledReactMarkdown
      rehypePlugins={[rehypeRaw]}
      urlTransform={transformUrl}
    >
      {text}
    </StyledReactMarkdown>
  );
};

export default TextContent;
