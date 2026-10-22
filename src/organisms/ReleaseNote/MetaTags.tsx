import { FC, ReactNode } from 'react';

import { comment_notes } from '@equinor/eds-icons';
import {
  ReleaseNote,
  ReleaseNoteType,
} from '@equinor/subsurface-app-management';

import { spacings } from 'src/atoms/style';
import { Tag, TagProps } from 'src/molecules/Tag/Tag';

import styled from 'styled-components';

const RELEASE_NOTE_TAG_COLOR: Record<ReleaseNoteType, TagProps['color']> = {
  [ReleaseNoteType.FEATURE]: 'blue',
  [ReleaseNoteType.IMPROVEMENT]: 'orange',
  [ReleaseNoteType.BUG_FIX]: 'pink',
} as const;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.small};
`;

type MetaTagsProps = {
  children?: ReactNode;
} & Pick<ReleaseNote, 'tags'>;

export const MetaTags: FC<MetaTagsProps> = ({ children, tags }) => {
  return (
    <Container>
      <Tag color="grey" leadingIcon={comment_notes}>
        Release Note
      </Tag>
      {tags?.map((tag) => (
        <Tag
          key={tag}
          color={RELEASE_NOTE_TAG_COLOR[tag as ReleaseNoteType] ?? 'grey'}
        >
          {tag}
        </Tag>
      ))}
      {children}
    </Container>
  );
};
