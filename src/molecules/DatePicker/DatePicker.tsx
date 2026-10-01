import { forwardRef, KeyboardEvent, useRef } from 'react';

import {
  DatePicker as EDSDatePicker,
  DatePickerProps as EDSDatePickerProps,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { calendar, lock } from '@equinor/eds-icons';

import { colors } from 'src/atoms/style';
import { Variants } from 'src/atoms/types/variants';
import { getSkeletonHeight, getSkeletonTop } from 'src/atoms/utils/skeleton';
import { DatePickerWrapper } from 'src/molecules/DatePicker/DatePicker.styles';
import { SkeletonField } from 'src/molecules/Skeleton/SkeletonField';

export type DatePickerProps = Omit<
  EDSDatePickerProps,
  'variant' | 'defaultValue'
> & {
  variant?: Variants;
  defaultValue?: Date | undefined;
  meta?: string;
  loading?: boolean;
  locked?: boolean;
  autofilled?: boolean;
};

/**
 * @param loading - Show loading skeleton on top of the date picker.
 * @param locked - Value is validated/accepted and can't be changed. Shows a lock icon.
 * @param autofilled - Value was filled in automatically. Consumer is responsible for resetting this when the user changes the value.
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ locked, autofilled, ...props }, ref) => {
    const locale: DatePickerProps['locale'] = props.locale ?? 'en-GB';
    const formatOptions: DatePickerProps['formatOptions'] =
      props.formatOptions !== undefined
        ? props.formatOptions
        : {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          };
    const usingDisabled = props.loading || props.disabled;
    const usingLocked = !!locked && !usingDisabled;
    const usingAutofilled = !!autofilled && !usingDisabled;
    const usingVariant = usingLocked ? undefined : props.variant;
    const baseProps = {
      ...props,
      defaultValue: props.defaultValue as
        | ((string | number | readonly string[]) & (Date | null))
        | undefined,
      variant: usingVariant !== 'dirty' ? usingVariant : undefined,
      loading: undefined,
      readOnly: usingLocked || props.readOnly,
    };

    // EDS opens the calendar on Space/Enter even when readOnly
    const handleOnKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
      if (usingLocked && (event.code === 'Space' || event.code === 'Enter')) {
        event.stopPropagation();
      }
    };
    const skeletonTop = getSkeletonTop(props);
    const skeletonHeight = getSkeletonHeight({
      label: props.label,
      helperText: props.helperProps?.text,
      helperIcon: props.helperProps?.icon,
    });
    const skeletonWidth = useRef(`${Math.max(40, Math.random() * 80)}%`);

    return (
      <DatePickerWrapper
        $variant={usingVariant}
        $loading={props.loading}
        $locked={usingLocked}
        $autofilled={usingAutofilled}
        data-input-cell-variant={!props.loading ? usingVariant : undefined}
        onKeyDownCapture={handleOnKeyDownCapture}
      >
        <EDSDatePicker
          {...baseProps}
          ref={ref}
          locale={locale}
          formatOptions={formatOptions}
          disabled={usingDisabled}
        />
        {props.meta && (
          <Typography variant="helper" group="input">
            {props.meta}
          </Typography>
        )}
        {props.loading && (
          <SkeletonField
            role="progressbar"
            style={{
              width: skeletonWidth.current,
              height: skeletonHeight,
              top: skeletonTop,
            }}
          />
        )}
        {usingLocked && (
          <Icon
            className="lock-icon"
            style={{ top: skeletonTop }}
            data={lock}
            size={24}
            color={colors.text.static_icons__default.rgba}
          />
        )}
        {(usingDisabled || usingLocked) && (
          <Icon
            style={{ top: skeletonTop }}
            data={calendar}
            size={24}
            color={
              usingLocked
                ? colors.interactive.disabled__text.rgba
                : colors.interactive.disabled__fill.rgba
            }
          />
        )}
      </DatePickerWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';
