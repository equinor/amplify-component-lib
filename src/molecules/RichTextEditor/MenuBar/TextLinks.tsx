import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';

import { Button, Icon, Popover } from '@equinor/eds-core-react';
import { link, link_off } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { EditorMenu } from './MenuBar';
import { isValidUrl } from 'src/atoms/utils/url';
import { TextField } from 'src/molecules/TextField/TextField';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  gap: ${spacings.comfortable.medium};
  padding: ${spacings.comfortable.small};
  width: 15rem;
`;

export const TextLinks: FC<EditorPanel> = ({ editor, features }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const linkText = useRef<string>('');
  const [failedToSave, setFailedToSave] = useState(false);

  const handleOnToggleOpen = () => {
    setOpen((prev) => !prev);
    editor.chain().focus().setHighlight({ color: '#accef7' }).run();
  };
  const handleOnClose = () => {
    setOpen(false);
    linkText.current = '';
    editor.chain().focus().unsetHighlight().run();
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    linkText.current = event.target.value;
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSetLink();
    }
  };

  const onSetLink = () => {
    if (!isValidUrl(linkText.current)) {
      setFailedToSave(true);
      return;
    }

    if (!linkText.current.includes('http')) {
      linkText.current = `https://${linkText.current}`;
    }
    // save link
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkText.current })
      .run();

    handleOnClose();
    if (failedToSave) setFailedToSave(false);
  };
  const onUnsetLink = () => editor?.chain().focus().unsetLink().run();

  if (features && !features.includes(RichTextEditorFeatures.LINKS)) return;
  return (
    <>
      <EditorMenu.Section>
        <EditorMenu.Button
          active={open}
          ref={buttonRef}
          icon={link}
          onClick={handleOnToggleOpen}
          disabled={editor.state.selection.empty}
          data-testid="link-button"
          tooltip="Link"
        />
        <EditorMenu.Button
          icon={link_off}
          onClick={onUnsetLink}
          disabled={!editor.isActive('link')}
          data-testid="unsetlink-button"
          tooltip="Remove Link"
        />
      </EditorMenu.Section>
      {open && (
        <Popover open anchorEl={buttonRef.current} onClose={handleOnClose}>
          <Container>
            <TextField
              id="link"
              placeholder="Insert link"
              autoComplete="off"
              autoFocus
              inputIcon={<Icon data={link} />}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              variant={failedToSave ? 'error' : undefined}
            />
            <Button variant="outlined" onClick={onSetLink}>
              Save
            </Button>
          </Container>
        </Popover>
      )}
    </>
  );
};
