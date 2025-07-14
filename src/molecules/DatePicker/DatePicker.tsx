import { forwardRef, useRef } from 'react';

import {
  DatePicker as EDSDatePicker,
  DatePickerProps as EDSDatePickerProps,
  Typography,
} from '@equinor/eds-core-react';

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
    const baseProps: EDSDatePickerProps = {
      ...props,
      variant: props.variant !== 'dirty' ? props.variant : undefined,
    };
    const skeletonTop = getSkeletonTop(props);
    const skeletonHeight = getSkeletonHeight({
      label: props.label,
      helperText: props.helperProps?.text,
      helperIcon: props.helperProps?.icon,
    });
    const skeletonWidth = useRef(`${Math.max(40, Math.random() * 80)}%`);

    return (
      <DatePickerWrapper $variant={props.variant} $loading={props.loading}>
        <EDSDatePicker
          {...baseProps}
          ref={ref}
          locale={locale}
          formatOptions={formatOptions}
          disabled={props.loading || props.disabled}
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
      </DatePickerWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';
