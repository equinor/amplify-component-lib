import { FC, ReactNode, useEffect, useRef } from 'react';

import { Comment, CommentData } from './Comment';
import { spacings } from 'src/atoms/style';
import { SideSheet, SideSheetProps } from 'src/organisms';
import { AddComment } from 'src/organisms/Comments/AddComment.tsx';
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

export const Comments: FC<CommentsProps> = ({
  subHeaderElements,
  comments,
  onDeleteComment,
  onAddComment,
  onEditComment,
  readonly,
  users,
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
        {comments.map((c) => (
          <Comment
            key={c.id}
            comment={c}
            onDelete={onDeleteComment}
            readonly={readonly}
            onEdit={onEditComment}
            users={users}
          />
        ))}
      </CommentsContainer>
      {!readonly && <AddComment addComment={onAddComment} users={users} />}
    </SideSheet>
  );
};
