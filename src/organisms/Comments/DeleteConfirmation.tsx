import type { FC } from 'react';

import { Dialog } from 'src/molecules';

interface DeleteConfirmationProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open
      title="Delete this comment"
      width={400}
      actions={[
        {
          text: 'Cancel',
          variant: 'outlined',
          onClick: onClose,
        },
        {
          text: 'Delete',
          variant: 'filled',
          color: 'danger',
          onClick: onConfirm,
        },
      ]}
      onClose={onClose}
    >
      You are about to delete your comment.
    </Dialog>
  );
};
