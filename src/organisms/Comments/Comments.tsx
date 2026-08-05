import { FC, ReactNode } from 'react';

import { Comment, CommentData } from './Comment';
import { spacings } from 'src/atoms/style';
import { SideSheet, SideSheetProps } from 'src/organisms';
import { AddComment } from 'src/organisms/Comments/AddComment.tsx';
import { Divider } from 'src/organisms/TopBar/Notifications/NotificationsTemplate/NotificationTemplate.style';

import { styled } from 'styled-components';

type CommentsProps = {
  comments: CommentData[];
  readonly?: boolean;
  onAddComment: (comment: string) => void;
  onEditComment: (commentId: string, newText: string) => void;
  onDeleteComment: (commentId: string) => void;
  subHeaderElements?: ReactNode;
  commentActions?: ReactNode;
} & Omit<SideSheetProps, 'children'>;

const StyledDivider = styled(Divider)`
  margin-left: 0;
  margin-right: 0;
`;

const CommentsContainer = styled.div`
  padding: ${spacings.medium};
  display: flex;
  flex-direction: column;
  gap: ${spacings.medium};
`;

export const Comments: FC<CommentsProps> = ({
  subHeaderElements,
  comments,
  onDeleteComment,
  onAddComment,
  readonly,
  ...sideSheetProps
}) => {
  return (
    <SideSheet {...sideSheetProps}>
      {subHeaderElements != undefined && (
        <>
          {subHeaderElements}
          <StyledDivider />
        </>
      )}

      <CommentsContainer>
        {comments.map((c) => (
          <Comment
            key={c.id}
            comment={c}
            onDelete={onDeleteComment}
            readonly={readonly}
          />
        ))}
      </CommentsContainer>
      {!readonly && <AddComment addComment={onAddComment} />}
    </SideSheet>
  );
};
