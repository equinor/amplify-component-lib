import type { FC } from 'react';
import { useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { delete_forever, edit } from '@equinor/eds-icons';

import { formatDateTime } from 'src/atoms';
import { colors, spacings } from 'src/atoms/style';
import {
  Dialog,
  IconButton,
  OptionalTooltip,
  ProfileAvatar,
  RichTextDisplay,
} from 'src/molecules';
import { VerticalDivider } from 'src/organisms/Comments/HorizontalDivider';

import { styled } from 'styled-components';

/**
 * Controls the visibility and enabled state of a comment action button.
 */
interface CommentAction {
  /**
   * Whether the button is visible but cannot be clicked.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is not rendered at all.
   *
   * @default false
   */
  hidden?: boolean;

  /**
   * The tooltip displayed when the button is disabled.
   *
   * Ignored unless `disabled` is `true`.
   */
  disabledReason?: string;
}

export interface CommentData {
  id: string;
  text: string;
  editAction?: CommentAction;
  deleteAction?: CommentAction;
  timestamp: Date | string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface CommentProps {
  comment: CommentData;
  readonly?: boolean;
  onDelete: (id: string) => void;
}

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const RightSide = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: ${spacings.small};
`;

const Actions = styled.div`
  display: none;
`;
const HeaderInfo = styled.div`
  margin-right: auto;
`;

const Header = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  gap: ${spacings.small};
  cursor: auto;

  &:hover ${Actions} {
    display: block;
  }
`;

export const Comment: FC<CommentProps> = ({
  comment: { author, timestamp, text, id, editAction, deleteAction },
  onDelete,
  readonly,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <Wrapper>
        <LeftSide>
          <ProfileAvatar url={author.avatar} name={author.name} />
          <VerticalDivider />
        </LeftSide>
        <RightSide>
          <Header>
            <HeaderInfo>
              <Typography group="paragraph" variant="body_short_bold">
                {author.name}
              </Typography>
              <Typography
                group="paragraph"
                variant="meta"
                color={colors.text.static_icons__tertiary.rgba}
              >
                {formatDateTime(timestamp)}
              </Typography>
            </HeaderInfo>
            {!readonly && (
              <Actions>
                {!editAction?.hidden && (
                  <OptionalTooltip
                    title={editAction?.disabled && editAction?.disabledReason}
                  >
                    <IconButton
                      icon={edit}
                      variant="ghost"
                      disabled={editAction?.disabled}
                    />
                  </OptionalTooltip>
                )}
                {!deleteAction?.hidden && (
                  <OptionalTooltip
                    title={
                      deleteAction?.disabled && deleteAction?.disabledReason
                    }
                  >
                    <IconButton
                      icon={delete_forever}
                      variant="ghost"
                      onClick={() => setDeleteDialogOpen(true)}
                      disabled={deleteAction?.disabled}
                    />
                  </OptionalTooltip>
                )}
              </Actions>
            )}
          </Header>
          <RichTextDisplay value={text} padding="none" />
        </RightSide>
      </Wrapper>
      <Dialog
        open={deleteDialogOpen}
        title="Delete this comment"
        width={400}
        actions={[
          {
            text: 'Cancel',
            variant: 'outlined',
            onClick: () => setDeleteDialogOpen(false),
          },
          {
            text: 'Delete',
            variant: 'filled',
            color: 'danger',
            onClick: () => {
              setDeleteDialogOpen(false);
              onDelete(id);
            },
          },
        ]}
        onClose={() => {}}
      >
        You are about to delete your comment.
      </Dialog>
    </>
  );
};
