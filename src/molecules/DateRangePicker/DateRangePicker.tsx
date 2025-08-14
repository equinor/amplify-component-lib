import { forwardRef, useRef } from 'react';

import {
  DateRangePicker as Base,
  DateRangePickerProps as BaseProps,
  Icon,
  Typography,
} from '@equinor/eds-core-react';
import { calendar_date_range } from '@equinor/eds-icons';

import { colors } from 'src/atoms/style';
import { Variants } from 'src/atoms/types/variants';
import { getSkeletonHeight, getSkeletonTop } from 'src/atoms/utils/skeleton';
import { DatePickerWrapper } from 'src/molecules/DatePicker/DatePicker.styles';
import { SkeletonField } from 'src/molecules/Skeleton/SkeletonField';

export type DateRangePickerProps = Omit<BaseProps, 'variant'> & {
  variant?: Variants;
  meta?: string;
  loading?: boolean;
};

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (props, ref) => {
    const locale: DateRangePickerProps['locale'] = props.locale ?? 'en-GB';
    const formatOptions: DateRangePickerProps['formatOptions'] =
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
    const usingDisabled = props.disabled || props.loading;

    return (
      <DatePickerWrapper $variant={props.variant} $loading={props.loading}>
        <Base
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
            data={calendar_date_range}
            size={24}
            color={colors.interactive.disabled__fill.rgba}
          />
        )}
      </DatePickerWrapper>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';
