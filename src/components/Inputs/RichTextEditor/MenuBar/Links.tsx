import { ChangeEvent, FC, useRef, useState } from 'react';

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

const Links: FC = () => {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const linkText = useRef<string>('');
  const [failedToSave, setFailedToSave] = useState(false);

  const handleOnToggleOpen = () => setOpen((prev) => !prev);
  const handleOnClose = () => {
    setOpen(false);
    linkText.current = '';
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    linkText.current = event.target.value;
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
          data-testid="link-button"
        />
        <MenuButton icon={link_off} onClick={onUnsetLink} />
      </Section>
      {open && (
        <Popover open anchorEl={buttonRef.current} onClose={handleOnClose}>
          <Container>
            <AmplifyTextField
              autoFocus
              id="link"
              placeholder="Insert link"
              autoComplete="off"
              inputIcon={<Icon data={link} />}
              onChange={handleOnChange}
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
