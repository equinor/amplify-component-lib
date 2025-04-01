import { EditorContent as TiptapContent } from '@tiptap/react';

import { colors, shape, spacings, typography } from 'src/atoms/style';
import { VARIANT_COLORS } from 'src/atoms/style/colors';
import { Variants } from 'src/atoms/types/variants';

import styled from 'styled-components';

export interface RichTextContentProps {
  $minHeight?: string;
  $maxHeight?: string;
  className?: string;
}

export const EditorContent = styled(TiptapContent)<RichTextContentProps>`
  display: grid;
  grid-template-rows: 1fr;
  overflow-y: auto;
  min-height: ${(props) => props.$minHeight || 'auto'};
  max-height: ${(props) => props.$maxHeight || 'auto'};
`;

export interface EditorStylingProps {
  $lightBackground?: boolean;
  $highlighted?: boolean;
  $padding?: 'sm' | 'md' | 'lg' | 'none';
  $border?: boolean;
  $variant?: Variants;
}

export const EditorStyling = styled.div<EditorStylingProps>`
  display: grid;
  grid-template-rows: auto 1fr;
  background: ${colors.ui.background__default.rgba};
  border-radius: ${shape.corners.borderRadius} ${shape.corners.borderRadius} 0 0;
  border: ${(props) =>
    props.$border ? `1px solid ${colors.ui.background__medium.rgba}` : 'none'};
  border-bottom: none;

  &:has(div[contenteditable='true']) {
    height: inherit;
  }

  & [data-placeholder]::before {
    color: ${colors.text.static_icons__tertiary.rgba} !important;
  }

  .tiptap {
    box-sizing: border-box;
    overflow-y: auto;
    background: ${(props) =>
      props.$lightBackground
        ? `${colors.ui.background__default.rgba}`
        : `${colors.ui.background__light.rgba}`};

    &[contenteditable='true'] {
      box-shadow: ${({ $highlighted, $variant }) =>
        $highlighted
          ? `inset 0 -2px ${colors.dataviz.darkblue.darker}`
          : $variant
            ? `inset 0 -2px ${VARIANT_COLORS[$variant]}`
            : `inset 0 -1px ${colors.ui.background__medium.rgba}`};
    }

    padding: ${(props) => {
      switch (props.$padding) {
        case 'sm':
          return spacings.small;
        case 'md':
          return spacings.medium;
        case 'lg':
          return spacings.large;
        case 'none':
        default:
          return 0;
      }
    }};

    a {
      color: ${colors.interactive.primary__resting.rgba};
    }
    a:hover {
      cursor: pointer;
      color: ${colors.interactive.primary__hover.rgba};
    }
    p {
      font-size: 16px;
      font-family: 'Equinor', sans-serif;
      color: ${colors.text.static_icons__default.rgba};
      line-height: ${typography.paragraph.body_long.lineHeight};
      margin: 0;
    }
    ul,
    ol {
      margin: 0;
    }
    img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 5px;
    }
    pre {
      background: #0d0d0d;
      border-radius: 0.5rem;
      color: #fff;
      font-family: 'Equinor Mono', monospace;
      padding: 0.75rem 1rem;
      margin: 0;

      code {
        background: none;
        color: inherit;
        font-size: 0.8rem;
        padding: 0;
      }
    }

    table {
      border-collapse: collapse;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;

      td,
      th {
        border: 2px solid #ced4da;
        box-sizing: border-box;
        min-width: 1em;
        padding: 3px 5px;
        position: relative;
        vertical-align: top;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        background-color: ${({ $lightBackground }) =>
          $lightBackground ? '#f1f3f5' : colors.ui.background__default.rgba};
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        background: rgba(200, 200, 255, 0.4);
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      .column-resize-handle {
        background-color: #adf;
        bottom: -2px;
        position: absolute;
        right: -2px;
        pointer-events: none;
        top: 0;
        width: 4px;
      }

      p {
        margin: 0;
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: inset 0 -2px ${colors.interactive.primary__resting.rgba};
    }
  }

  .tiptap p.is-editor-empty:first-child::before {
    color: ${colors.text.static_icons__default.rgba};
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${spacings.small};
  > p {
    color: ${colors.text.static_icons__tertiary.rgba};
  }
`;

export const HelperWrapper = styled.div`
  display: flex;
  gap: ${spacings.small};
  padding-left: ${spacings.small};
  margin-top: ${spacings.small};
`;
