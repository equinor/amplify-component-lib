import { ChangeEvent, FC } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { format_color_text } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useCurrentEditor } from '@tiptap/react';

import styled from 'styled-components';

const { colors, spacings, shape } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  position: relative;
  background: ${colors.ui.background__light.rgba};
  border-radius: ${shape.button.borderRadius};
  > input {
    border-radius: ${shape.button.borderRadius};
    width: calc(24px + (${spacings.comfortable.x_small}) * 2);
    height: calc(24px + (${spacings.comfortable.x_small}) * 2);
    opacity: 0;
    &:hover {
      cursor: pointer;
    }
    &::-webkit-color-swatch {
      border: none;
    }
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  left: 50%;
  top: calc(50% + ${spacings.comfortable.x_small} / 2);
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const TextColor: FC = () => {
  const { editor } = useCurrentEditor();

  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    editor?.chain().focus().setColor(event.target.value).run();
  };

  return (
    <Container>
      <input
        type="color"
        onInput={handleOnInput}
        value={
          editor?.getAttributes('textStyle')?.color ||
          colors.text.static_icons__default.hex
        }
      />
      <IconWrapper>
        <Icon
          data={format_color_text}
          color={
            editor?.getAttributes('textStyle')?.color ||
            colors.text.static_icons__default.hex
          }
        />
      </IconWrapper>
    </Container>
  );
};

export default TextColor;
