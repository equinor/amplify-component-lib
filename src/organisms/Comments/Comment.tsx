import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Typography } from '@equinor/eds-core-react';
import { delete_forever, edit } from '@equinor/eds-icons';
import Mention from '@tiptap/extension-mention';

import { formatDateTime, useAmplifyKit } from 'src/atoms';
import { colors, spacings } from 'src/atoms/style';
import {
  Button,
  DEFAULT_FEATURES,
  IconButton,
  OptionalTooltip,
  ProfileAvatar,
  RichTextDisplay,
  RichTextEditor,
  RichTextEditorFeatures,
} from 'src/molecules';
import { User } from 'src/organisms/Comments/Comments.tsx';
import { DeleteConfirmation } from 'src/organisms/Comments/DeleteConfirmation.tsx';
import { VerticalDivider } from 'src/organisms/Comments/HorizontalDivider';
import { getSuggestions } from 'src/organisms/Comments/mentions/suggestions.ts';
import { extractMentions } from 'src/organisms/Comments/mentions/utils.ts';

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
  onEdit: ({
    id,
    text,
    mentions,
  }: {
    id: string;
    text: string;
    mentions: User[];
  }) => void;
  users?: User[];
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
  comment,
  onDelete,
  onEdit,
  readonly,
  users,
}) => {
  const defaultExtensions = useAmplifyKit({
    features: DEFAULT_FEATURES,
  });

  const commentContainer = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(comment.text);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleCommentEdit = () => {
    onEdit({
      id: comment.id,
      text,
      mentions: extractMentions(text, users ?? []),
    });
    setEditing(false);
  };

  useEffect(() => {
    if (editing) {
      commentContainer.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [editing]);

  return (
    <>
      <Wrapper ref={commentContainer}>
        <LeftSide>
          <ProfileAvatar
            url={comment.author.avatar}
            name={comment.author.name}
          />
          <VerticalDivider />
        </LeftSide>
        <RightSide>
          <Header>
            <HeaderInfo>
              <Typography group="paragraph" variant="body_short_bold">
                {comment.author.name}
              </Typography>
              <Typography
                group="paragraph"
                variant="meta"
                color={colors.text.static_icons__tertiary.rgba}
              >
                {formatDateTime(comment.timestamp)}
              </Typography>
            </HeaderInfo>
            {!readonly && (
              <Actions data-testid="comment-actions">
                {!comment.editAction?.hidden && (
                  <OptionalTooltip
                    title={
                      comment.editAction?.disabled &&
                      comment.editAction?.disabledReason
                    }
                  >
                    <IconButton
                      data-testid="edit-comment-button"
                      icon={edit}
                      variant="ghost"
                      disabled={comment.editAction?.disabled}
                      onClick={() => setEditing((prev) => !prev)}
                    />
                  </OptionalTooltip>
                )}
                {!comment.deleteAction?.hidden && (
                  <OptionalTooltip
                    title={
                      comment.deleteAction?.disabled &&
                      comment.deleteAction?.disabledReason
                    }
                  >
                    <IconButton
                      data-testid="delete-comment-button"
                      icon={delete_forever}
                      variant="ghost"
                      onClick={() => setDeleteDialogOpen(true)}
                      disabled={comment.deleteAction?.disabled}
                    />
                  </OptionalTooltip>
                )}
              </Actions>
            )}
          </Header>
          {editing ? (
            <RichTextEditor
              value={text}
              onChange={setText}
              lightBackground
              maxHeight="130px"
              minHeight="130px"
              footer={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: spacings.medium_small,
                  }}
                >
                  <Button variant="ghost" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="outlined" onClick={handleCommentEdit}>
                    Update
                  </Button>
                </div>
              }
              removeFeatures={[
                RichTextEditorFeatures.ALIGNMENT,
                RichTextEditorFeatures.IMAGES,
                RichTextEditorFeatures.TABLE,
                RichTextEditorFeatures.LINKS,
                RichTextEditorFeatures.UNDO_REDO,
                RichTextEditorFeatures.HEADERS,
                RichTextEditorFeatures.TEXT_COLOR,
                RichTextEditorFeatures.CODE,
              ]}
              extensions={[
                Mention.configure({
                  HTMLAttributes: {
                    class: 'mention',
                  },
                  suggestions: getSuggestions(users || []),
                }),
              ]}
            />
          ) : (
            <RichTextDisplay
              value={comment.text}
              padding="none"
              extensions={[
                defaultExtensions,
                Mention.configure({
                  HTMLAttributes: {
                    class: 'mention',
                  },
                  suggestions: getSuggestions(users || []),
                }),
              ]}
            />
          )}
        </RightSide>
      </Wrapper>
      {deleteDialogOpen && (
        <DeleteConfirmation
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={() => {
            setDeleteDialogOpen(false);
            onDelete(comment.id);
          }}
        />
      )}
    </>
  );
};
