import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  TextField as Base,
  TextFieldProps as BaseProps,
  Typography,
} from '@equinor/eds-core-react';

import { shape, spacings } from 'src/atoms/style';
import { animation } from 'src/atoms/style/animation';
import { colors, VARIANT_COLORS } from 'src/atoms/style/colors';
import { Variants } from 'src/atoms/types/variants';
import { getSkeletonHeight, getSkeletonTop } from 'src/atoms/utils/skeleton';
import { SkeletonBase } from 'src/molecules/Skeleton/SkeletonBase/SkeletonBase';

import styled, { css } from 'styled-components';

export type TextFieldProps = Omit<BaseProps, 'variant' | 'inputRef'> & {
  variant?: Variants;
  loading?: boolean;
  maxCharacters?: number;
} & (
    | TextareaHTMLAttributes<HTMLTextAreaElement>
    | InputHTMLAttributes<HTMLInputElement>
  );

interface WrapperProps {
  $variant: TextFieldProps['variant'];
  $helperRightWidth: number;
  $disabled?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  position: relative;
  height: fit-content;
  input,
  textarea {
    color: ${colors.text.static_icons__default.rgba};
    transition:
      background ${animation.transitionMS},
      box-shadow ${animation.transitionMS};
    &::placeholder {
      opacity: 1;
    }
    &:hover {
      background: ${colors.ui.background__light_medium.rgba};
    }
    &:disabled {
      &::placeholder {
        color: ${colors.interactive.disabled__text.rgba};
      }
    }
  }
  div:focus-within {
    outline: none !important;
  }

  div[class*='HelperText'] {
    margin-right: ${({ $helperRightWidth }) =>
      $helperRightWidth
        ? `calc(${$helperRightWidth}px + ${spacings.medium})`
        : 0};
  }

  ${({ $variant, $disabled }) => {
    if ($disabled) {
      return css`
        div {
          outline: none !important;
        }
        p {
          color: ${colors.interactive.disabled__text.rgba} !important;
        }
      `;
    }

    if ($variant === undefined) {
      return css`
        input:hover,
        textarea:hover {
          box-shadow: inset 0 -2px 0 0
            ${colors.text.static_icons__tertiary.rgba};
        }

        div:focus-within {
          input,
          textarea {
            box-shadow: inset 0 -2px 0 0
              ${colors.interactive.primary__resting.rgba};
          }
        }
      `;
    }

    return css`
      ${$variant === 'dirty' &&
      css`
        input,
        textarea {
          box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS[$variant]};
        }
      `}

      input:hover,
      textarea:hover {
        box-shadow: inset 0 -${$variant === 'dirty' ? 2 : 1}px 0 0
          ${VARIANT_COLORS[$variant]};
      }

      div:focus-within {
        outline: none !important;

        input,
        textarea {
          box-shadow: inset 0 -2px 0 0 ${VARIANT_COLORS[$variant]};
        }
      }
    `;
  }}
`;

const Loader = styled(SkeletonBase)`
  position: absolute;
  left: ${spacings.small};
  border-radius: ${shape.corners.borderRadius};
  transform: translateY(${spacings.x_small});
`;

const MaxCharactersText = styled(Typography)`
  position: absolute;
  right: ${spacings.small};
`;

/**
 * @param loading - Show loading skeleton on top of the text field.
 * @param maxCharacters - Maximum number of characters allowed in the text field. Does not enforce the limit, only for display purposes.
 */
export const TextField: FC<TextFieldProps> = (props) => {
  if (props.maxCharacters && 'type' in props && props.type !== 'text') {
    throw new Error(
      '`maxCharacters` prop is not supported for input types other than "text".'
    );
  }
  const baseProps: BaseProps = {
    ...props,
    variant: props.variant !== 'dirty' ? props.variant : undefined,
  };

  const usingVariant = props.loading ? undefined : props.variant;
  const skeletonTop = getSkeletonTop(props);
  const skeletonHeight = getSkeletonHeight(props);
  const skeletonWidth = useRef(`${Math.max(20, Math.random() * 80)}%`);
  const [characterCount, setCharacterCount] = useState<number>(
    typeof props.value === 'string' ? props.value.length : 0
  );
  const [helperRightWidth, setHelperRightWidth] = useState(0);

  const handleRenderHelperTextRight = (element: HTMLDivElement | null) => {
    if (element) {
      const width = element.getBoundingClientRect().width;
      setHelperRightWidth(width);
    }
  };

  // Since both textarea and input have event.target.value , we can safely cast here
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      (props.onChange as ChangeEventHandler<HTMLInputElement>)(event);
    }

    if (props.maxCharacters) {
      setCharacterCount(event.target.value.length);
    }
  };

  const handleOnTextFieldRender = (
    element: HTMLInputElement | HTMLTextAreaElement | null
  ) => {
    if (
      props.maxCharacters &&
      element &&
      element.value.length !== characterCount
    ) {
      setCharacterCount(element.value.length);
    }
  };

  useEffect(() => {
    if (
      typeof props.value === 'string' &&
      props.maxCharacters &&
      props.value.length !== characterCount
    ) {
      setCharacterCount(props.value.length);
    }
  }, [characterCount, props.maxCharacters, props.value]);

  return (
    <Wrapper
      $variant={usingVariant}
      $disabled={props.loading ? false : props.disabled}
      $helperRightWidth={helperRightWidth}
      style={{
        marginBottom: props.helperText ? 0 : `calc(${spacings.small} + 1rem)`,
      }}
    >
      <Base
        {...baseProps}
        inputRef={handleOnTextFieldRender}
        disabled={props.loading || props.disabled}
        onChange={handleOnChange as never} // Bypass TS error caused by union of input and textarea attributes
      />
      {props.loading && (
        <Loader
          className="skeleton"
          role="progressbar"
          style={{
            top: skeletonTop,
            height: skeletonHeight,
            width: skeletonWidth.current,
          }}
        />
      )}
      {props.maxCharacters && (
        <MaxCharactersText
          ref={handleRenderHelperTextRight}
          variant="helper"
          group="input"
          color={
            baseProps.variant
              ? VARIANT_COLORS[baseProps.variant]
              : colors.text.static_icons__tertiary.rgba
          }
          style={{
            bottom: props.helperText
              ? '0'
              : `calc((${spacings.small} + 1rem) * -1)`,
          }}
        >
          {characterCount} / {props.maxCharacters}
        </MaxCharactersText>
      )}
    </Wrapper>
  );
};
