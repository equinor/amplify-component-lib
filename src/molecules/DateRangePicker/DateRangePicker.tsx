import { forwardRef } from 'react';

import {
  DateRangePicker as Base,
  DateRangePickerProps as BaseProps,
  Typography,
} from '@equinor/eds-core-react';

import { Variants } from 'src/atoms/types/variants';
import { DatePickerWrapper } from 'src/molecules/DatePicker/DatePicker.styles';

export type DateRangePickerProps = Omit<BaseProps, 'variant'> & {
  variant?: Variants;
  meta?: string;
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
    const baseProps: BaseProps = {
      ...props,
      variant: props.variant !== 'dirty' ? props.variant : undefined,
    };

    return (
      <DatePickerWrapper $variant={props.variant}>
        <Base
          {...baseProps}
          ref={ref}
          locale={locale}
          formatOptions={formatOptions}
        />
        {props.meta && (
          <Typography variant="helper" group="input">
            {props.meta}
          </Typography>
        )}
      </DatePickerWrapper>
    );
  }
);

DateRangePicker.displayName = 'DateRangePicker';
