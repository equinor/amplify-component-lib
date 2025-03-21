import { FC, ReactNode } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { comment_notes } from '@equinor/eds-icons';
import {
  ReleaseNote,
  ReleaseNoteType,
} from '@equinor/subsurface-app-management';

import { colors, spacings } from 'src/atoms/style';
import { Chip } from 'src/molecules/Chip/Chip';

import styled from 'styled-components';

const RELEASE_NOTE_DOT_COLOR: Record<ReleaseNoteType, string> = {
  [ReleaseNoteType.FEATURE]: colors.dataviz.lightblue.darker,
  [ReleaseNoteType.IMPROVEMENT]: colors.interactive.warning__resting.rgba,
  [ReleaseNoteType.BUG_FIX]: colors.interactive.danger__resting.rgba,
} as const;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.small};
  margin-bottom: 1px; // Make room for the outline on the chips
`;

const Dot = styled.span`
  width: 10px !important;
  height: 10px !important;
  border-radius: 50%;
`;

type MetaTagsProps = {
  children?: ReactNode;
} & Pick<ReleaseNote, 'tags'>;

export const MetaTags: FC<MetaTagsProps> = ({ children, tags }) => {
  return (
    <Container>
      <Chip>
        <Icon data={comment_notes} />
        Release Note
      </Chip>
      {tags?.map((tag) => (
        <Chip key={tag}>
          <Dot
            style={{
              background: RELEASE_NOTE_DOT_COLOR[tag as ReleaseNoteType],
            }}
          />
          {tag}
        </Chip>
      ))}
      {children}
    </Container>
  );
};
