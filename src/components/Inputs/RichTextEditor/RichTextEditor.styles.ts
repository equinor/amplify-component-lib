import { tokens } from '@equinor/eds-tokens';

import styled from 'styled-components';

const { colors, spacings, typography, shape } = tokens;

export interface EditorStylingProps {
  $lightBackground?: boolean;
  $padding?: 'sm' | 'md' | 'lg' | 'none';
  $maxHeight?: string;
  $border?: boolean;
}

export const EditorStyling = styled.div<EditorStylingProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
    max-height: ${(props) => props.$maxHeight ?? 'none'};
    overflow-y: auto;
    background: ${(props) =>
      props.$lightBackground
        ? `${colors.ui.background__default.rgba}`
        : `${colors.ui.background__light.rgba}`};

    &[contenteditable='true'] {
      box-shadow: inset 0 -1px ${colors.ui.background__medium.rgba};
    }

    padding: ${(props) => {
      switch (props.$padding) {
        case 'sm':
          return spacings.comfortable.small;
        case 'md':
          return spacings.comfortable.medium;
        case 'lg':
          return spacings.comfortable.large;
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
        background-color: #f1f3f5;
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
