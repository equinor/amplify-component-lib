import { useSnackbar } from '@equinor/amplify-component-lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { ReleaseNotesService, type ReleaseNote } from 'src/api';
import { DeleteDialog } from 'src/components/DeleteDialog/DeleteDialog';
import { GET_ALL_RELEASE_NOTES } from 'src/constants';

interface DeleteButtonProps {
  releaseId: string;
  applicationName: string;
  title: string;
  draft: boolean;
  onClose: () => void;
}

export const DeleteNote: FC<DeleteButtonProps> = ({
  releaseId,
  applicationName,
  title,
  draft,
  onClose,
}) => {
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { isPending, mutate: deleteReleaseNote } = useMutation({
    mutationFn: () =>
      ReleaseNotesService.deleteReleasenote(applicationName, releaseId),
    onSuccess: () => {
      queryClient.setQueryData([GET_ALL_RELEASE_NOTES], (data: ReleaseNote[]) =>
        data.filter((d) => d.releaseId !== releaseId)
      );
      showSnackbar('Deleted release note');
      onClose();
    },
    onError: () => {
      showSnackbar({ text: 'Failed to delete release note', variant: 'error' });
    },
  });

  return (
    <DeleteDialog
      title={`You are deleting a ${draft ? 'draft' : 'published release note'}`}
      subTitle={`Are you sure you want to delete "${title}"?`}
      deleteText={`Delete ${draft ? 'draft' : 'published'}`}
      isPending={isPending}
      onDelete={deleteReleaseNote}
      onClose={onClose}
    />
  );
};
