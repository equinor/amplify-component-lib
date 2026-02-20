import { ChangeEvent, FC } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { format_color_text } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { EditorPanel, RichTextEditorFeatures } from '../RichTextEditor.types';
import { OptionalTooltip } from 'src/molecules/OptionalTooltip/OptionalTooltip';

import styled from 'styled-components';

const { colors, spacings, shape } = tokens;

const TextColorStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.comfortable.medium};
  position: relative;
  background: ${colors.ui.background__light.rgba};
  border-radius: ${shape.button.borderRadius};
  transition: 200ms background;
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
  svg {
    fill: ${colors.interactive.primary__resting.rgba};
    transition: 200ms fill;
  }
  &:hover {
    background: ${colors.interactive.primary__hover_alt.rgba};

    svg {
      fill: ${colors.interactive.primary__hover.rgba};
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

const ColorBar = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5px;
  height: 4px;
  width: 24px;
`;

export const TextColor: FC<EditorPanel> = ({ editor, features }) => {
  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(event.target.value).run();
  };

  if (features && !features.includes(RichTextEditorFeatures.TEXT_COLOR))
    return null;
  return (
    <OptionalTooltip title="Text Color" enterDelay={300}>
      <TextColorStyle>
        <input
          type="color"
          onChange={handleOnInput}
          data-testid="text-color-input"
          value={
            (editor.getAttributes('textStyle')?.color as string) ||
            colors.text.static_icons__default.hex
          }
        />
        <IconWrapper>
          <Icon data={format_color_text} />
        </IconWrapper>
        <ColorBar
          style={{
            background:
              (editor.getAttributes('textStyle')?.color as string) ||
              colors.text.static_icons__default.hex,
          }}
        />
      </TextColorStyle>
    </OptionalTooltip>
  );
};
