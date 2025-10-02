import { Dialog, useSnackbar } from '@equinor/amplify-component-lib';
import { useMutation } from '@tanstack/react-query';
import type { FC } from 'react';
import { ApiError, ReleaseNotesService } from 'src/api';
import { useUpdateReleaseNoteCache } from 'src/hooks';

interface UnpublishNoteProps {
  releaseId: string;
  applicationName: string;
  onClose: () => void;
}

export const UnpublishNote: FC<UnpublishNoteProps> = ({
  releaseId,
  applicationName,
  onClose,
}) => {
  const { showSnackbar } = useSnackbar();
  const { updateCache } = useUpdateReleaseNoteCache();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      return ReleaseNotesService.updateReleaseNote({
        draft: true,
        releaseId,
        applicationName,
      });
    },
    onSuccess: (data) => {
      updateCache(data);
    },
  });

  const handleOnUnpublish = async () => {
    try {
      await mutateAsync();
      showSnackbar('Unpublished release note');
      onClose();
    } catch (error) {
      if (error instanceof ApiError) {
        showSnackbar({
          text: error.message,
          variant: 'error',
        });
      } else {
        showSnackbar({
          text: 'Something went wrong',
          variant: 'error',
        });
      }
    }
  };

  return (
    <Dialog
      open
      title="Unpublishing a release note"
      onClose={onClose}
      width={382}
      actions={[
        {
          text: 'Cancel',
          variant: 'ghost',
          onClick: onClose,
        },
        {
          text: 'Unpublish',
          variant: 'outlined',
          color: 'danger',
          isLoading: isPending,
          onClick: handleOnUnpublish,
        },
      ]}
    >
      By unpublishing a release note, it will no longer be visible to the
      applications end users. You can still find it under “Drafts”. Do you wish
      to unpublish it?
    </Dialog>
  );
};
