import { forwardRef, useRef } from 'react';

import {
  DatePicker as EDSDatePicker,
  DatePickerProps as EDSDatePickerProps,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { calendar } from '@equinor/eds-icons';

import { colors } from 'src/atoms/style';
import { Variants } from 'src/atoms/types/variants';
import { getSkeletonHeight, getSkeletonTop } from 'src/atoms/utils/skeleton';
import { DatePickerWrapper } from 'src/molecules/DatePicker/DatePicker.styles';
import { SkeletonField } from 'src/molecules/Skeleton/SkeletonField';

export type DatePickerProps = Omit<EDSDatePickerProps, 'variant'> & {
  variant?: Variants;
  meta?: string;
  loading?: boolean;
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const locale: DatePickerProps['locale'] = props.locale ?? 'en-GB';
    const formatOptions: DatePickerProps['formatOptions'] =
      props.formatOptions !== undefined
        ? props.formatOptions
        : {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          };
    const baseProps = {
      ...props,
      variant: props.variant !== 'dirty' ? props.variant : undefined,
      loading: undefined,
    };
    const skeletonTop = getSkeletonTop(props);
    const skeletonHeight = getSkeletonHeight({
      label: props.label,
      helperText: props.helperProps?.text,
      helperIcon: props.helperProps?.icon,
    });
    const skeletonWidth = useRef(`${Math.max(40, Math.random() * 80)}%`);
    const usingDisabled = props.loading || props.disabled;

    return (
      <DatePickerWrapper $variant={props.variant} $loading={props.loading}>
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
        {usingDisabled && (
          <Icon
            style={{ top: skeletonTop }}
            data={calendar}
            size={24}
            color={colors.interactive.disabled__fill.rgba}
          />
        )}
      </DatePickerWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';
