import { animation, spacings } from 'src/atoms/style';
import { TableHeaderProps } from 'src/molecules/TableHeader/TableHeader';
import {
  getButtonHoverColor,
  getHoverColor,
} from 'src/molecules/TableHeader/TableHeader.utils';

import styled, { css } from 'styled-components';

export const Wrapper = styled.th``;

export const ActionsWrapper = styled.span`
  display: flex;
  gap: ${spacings.small};
  margin-left: auto;
`;

interface ContainerProps {
  $hasOnClick: boolean;
  $hasOnSort: boolean;
  $variant: TableHeaderProps['variant'];
}

export const Container = styled.span<ContainerProps>`
  display: flex;
  gap: ${spacings.small};
  padding: ${spacings.small};
  align-items: center;
  > ${ActionsWrapper} > button {
    margin-left: auto;
  }
  > ${ActionsWrapper} > button.sort-button {
    opacity: 0;
    transition: opacity ${animation.transitionMS};
  }
  > ${ActionsWrapper} > button:hover {
    background: none;
    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      opacity: 0.15;
      border-radius: 50%;
      background: ${({ $variant }) =>
        getButtonHoverColor({ variant: $variant })};
    }
  }
  ${({ $hasOnClick, $hasOnSort, $variant }) => {
    if (!$hasOnClick && !$hasOnSort) return '';

    if ($hasOnClick) {
      return css`
        cursor: pointer;
        &:hover {
          background: ${getHoverColor({ variant: $variant })};
          > ${ActionsWrapper} > button.sort-button {
            opacity: 1;
          }
        }
      `;
    }

    return css`
      cursor: pointer;
      &:hover {
        > ${ActionsWrapper} > button.sort-button {
          opacity: 1;
        }
      }
      &:hover:not(:has(> ${ActionsWrapper} > button:hover)) {
        > ${ActionsWrapper} > button.sort-button {
          opacity: 1;
          &:before {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            opacity: 0.15;
            border-radius: 50%;
            background: ${getButtonHoverColor({ variant: $variant })};
          }
        }
      }
    `;
  }}
`;
