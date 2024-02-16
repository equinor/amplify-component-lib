import { ChangeEvent, FC, KeyboardEvent, useRef, useState } from 'react';

import { Button, Icon, Popover } from '@equinor/eds-core-react';
import { link, link_off } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useCurrentEditor } from '@tiptap/react';

import { Section } from './MenuBar.styles';
import MenuButton from './MenuButton';
import AmplifyTextField from 'src/components/Inputs/AmplifyTextField';
import url from 'src/utils/url';

import styled from 'styled-components';

const { spacings } = tokens;

const Container = styled.div`
  display: flex;
  gap: ${spacings.comfortable.medium};
  padding: ${spacings.comfortable.small};
  width: 15rem;
`;

//💡 Wasn't able to test this component due to tiptap not setting the selected text
// as expected when inside a test, thus the link buttons are always disabled - Marius 24. Jan 2024
/* c8 ignore start */
const Links: FC = () => {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const linkText = useRef<string>('');
  const [failedToSave, setFailedToSave] = useState(false);

  const handleOnToggleOpen = () => {
    setOpen((prev) => !prev);
    editor?.chain().focus().setHighlight({ color: '#accef7' }).run();
  };
  const handleOnClose = () => {
    setOpen(false);
    linkText.current = '';
    editor?.chain().focus().unsetHighlight().run();
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
    if (!url.isValidUrl(linkText.current)) {
      setFailedToSave(true);
      return;
    }

    // save link
    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkText.current })
      .run();

    handleOnClose();
    if (failedToSave) setFailedToSave(false);
  };
  const onUnsetLink = () => editor?.chain().focus().unsetLink().run();

  return (
    <>
      <Section>
        <MenuButton
          active={open}
          ref={buttonRef}
          icon={link}
          onClick={handleOnToggleOpen}
          disabled={editor?.state.selection.empty}
          data-testid="link-button"
        />
        <MenuButton
          icon={link_off}
          onClick={onUnsetLink}
          disabled={!editor?.isActive('link')}
        />
      </Section>
      {open && (
        <Popover open anchorEl={buttonRef.current} onClose={handleOnClose}>
          <Container>
            <AmplifyTextField
              inputRef={(element) => {
                element?.focus();
              }}
              id="link"
              placeholder="Insert link"
              autoComplete="off"
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

export default Links;
/* c8 ignore end */
