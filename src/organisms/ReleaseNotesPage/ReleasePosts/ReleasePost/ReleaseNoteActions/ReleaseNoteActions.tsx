import { Button, colors, Icon, Menu } from '@equinor/amplify-component-lib';
import {
  delete_to_trash,
  edit,
  more_vertical,
  remove_outlined,
} from '@equinor/eds-icons';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useMemo, useRef, useState, type FC } from 'react';
import type { ReleaseNote } from 'src/api';
import { useAppNameToAppId, useSamRoles } from 'src/hooks';
import styled from 'styled-components';
import { DeleteNote } from './DeleteNote';
import { UnpublishNote } from './UnpublishNote';

const MenuItem = styled(Menu.Item)`
  width: 256px;
  &:last-child {
    color: ${colors.interactive.danger__resting.rgba};
  }
`;

type ReleaseNoteActionsProps = Omit<ReleaseNote, 'createdDate' | 'body'>;

export const ReleaseNoteActions: FC<ReleaseNoteActionsProps> = ({
  releaseId,
  applicationName,
  title,
  draft,
}) => {
  const appId = useAppNameToAppId(applicationName);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showUnpublish, setShowUnpublish] = useState(false);
  const { checkHasEditRights } = useSamRoles();
  const navigate = useNavigate();

  const handleOnButtonClick = () => {
    setOpen((prev) => !prev);
  };

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    setShowDelete(true);
    setOpen(false);
  };

  const handelCloseDelete = () => {
    setShowDelete(false);
  };

  const handleOnEdit = useCallback(() => {
    if (!appId) return;

    navigate({
      to: '/release-notes/$appId/$releaseId',
      params: {
        appId,
        releaseId,
      },
    });
  }, [appId, navigate, releaseId]);

  const handleOnUnpublish = () => {
    setOpen(false);
    setShowUnpublish(true);
  };

  const handleCloseUnpublish = () => {
    setShowUnpublish(false);
  };

  const menuItems = useMemo(() => {
    const items = [
      <MenuItem key="edit" onClick={handleOnEdit}>
        <Icon data={edit} color={colors.interactive.primary__resting.rgba} />
        Edit Release Note
      </MenuItem>,
    ];

    if (!draft) {
      items.push(
        <MenuItem key="unpublish" onClick={handleOnUnpublish}>
          <Icon
            data={remove_outlined}
            color={colors.interactive.primary__resting.rgba}
          />
          Unpublish Release Note
        </MenuItem>
      );
    }

    items.push(
      <MenuItem key="delete" onClick={handleDeleteClick}>
        <Icon
          data={delete_to_trash}
          color={colors.interactive.danger__resting.rgba}
        />
        Delete Release Note
      </MenuItem>
    );

    return items;
  }, [draft, handleOnEdit]);

  if (!checkHasEditRights('release-notes', appId)) return null;

  return (
    <>
      <Button
        data-testid="release-note-actions-button"
        ref={buttonRef}
        variant="ghost_icon"
        onClick={handleOnButtonClick}
      >
        <Icon data={more_vertical} size={24} />
      </Button>
      {open && (
        <Menu
          open
          anchorEl={buttonRef.current}
          placement="bottom-start"
          onClose={handleOnClose}
        >
          <Menu.Section title="Note options">{menuItems}</Menu.Section>
        </Menu>
      )}
      {showDelete && (
        <DeleteNote
          releaseId={releaseId}
          applicationName={applicationName}
          title={title}
          draft={draft}
          onClose={handelCloseDelete}
        />
      )}
      {showUnpublish && (
        <UnpublishNote
          releaseId={releaseId}
          applicationName={applicationName}
          onClose={handleCloseUnpublish}
        />
      )}
    </>
  );
};
