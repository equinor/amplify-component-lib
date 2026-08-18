import { FC, ReactNode, useEffect, useRef } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { Comment, CommentData } from './Comment';
import { colors, spacings } from 'src/atoms/style';
import { SideSheet, SideSheetProps } from 'src/organisms';
import { AddComment } from 'src/organisms/Comments/AddComment';
import { Divider } from 'src/organisms/TopBar/Notifications/NotificationsTemplate/NotificationTemplate.style';

import { styled } from 'styled-components';

export interface User {
  displayName: string;
  shortName?: string;
}

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type CommentsProps = {
  comments: CommentData[];
  readonly?: boolean;
  onAddComment: (comment: string) => void;
  onEditComment: ({ id, text }: { id: string; text: string }) => void;
  onDeleteComment: (commentId: string) => void;
  subHeaderElements?: ReactNode;
  commentActions?: ReactNode;
  emptyContent?: ReactNode;
  users?: User[];
} & DistributiveOmit<SideSheetProps, 'children'>;

const StyledDivider = styled(Divider)`
  margin-left: 0;
  margin-right: 0;
`;

const CommentsContainer = styled.div`
  padding: ${spacings.medium};
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
  overflow: auto;
`;

const NoCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px dashed ${colors.ui.background__medium.rgba};
  padding: ${spacings.medium} ${spacings.large};
`;

export const Comments: FC<CommentsProps> = ({
  subHeaderElements,
  comments,
  onDeleteComment,
  onAddComment,
  onEditComment,
  readonly,
  users,
  emptyContent,
  ...sideSheetProps
}) => {
  const commentsContainer = useRef<HTMLDivElement>(null);

  const lastCommentId = comments.at(-1)?.id;

  useEffect(() => {
    commentsContainer.current?.scrollTo({
      top: commentsContainer.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [lastCommentId]);

  return (
    <SideSheet {...sideSheetProps}>
      {subHeaderElements != undefined && (
        <>
          {subHeaderElements}
          <StyledDivider />
        </>
      )}

      <CommentsContainer ref={commentsContainer}>
        {comments.length > 0
          ? comments.map((c) => (
              <Comment
                key={c.id}
                comment={c}
                onDelete={onDeleteComment}
                readonly={readonly}
                onEdit={onEditComment}
                users={users}
              />
            ))
          : (emptyContent ?? (
              <NoCommentsContainer>
                <Typography
                  group="paragraph"
                  variant="body_short"
                  color={colors.text.static_icons__tertiary.rgba}
                >
                  No comments yet.
                </Typography>
              </NoCommentsContainer>
            ))}
      </CommentsContainer>
      {!readonly && <AddComment addComment={onAddComment} users={users} />}
    </SideSheet>
  );
};
