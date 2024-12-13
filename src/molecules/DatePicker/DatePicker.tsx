import { forwardRef } from 'react';
import { I18nProvider } from 'react-aria';

import {
  DatePicker as EDSDatePicker,
  DatePickerProps as EDSDatePickerProps,
  Typography,
} from '@equinor/eds-core-react';

import { DatePickerWrapper } from 'src/molecules/DatePicker/DatePicker.styles';

export interface DatePickerProps extends EDSDatePickerProps {
  meta?: string;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (props, ref) => {
    const locale: DatePickerProps['locale'] = props.locale ?? 'en-GB';
    const formatOptions: DatePickerProps['formatOptions'] =
      props.formatOptions !== undefined
        ? props.formatOptions
        : {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
          };

    return (
      <DatePickerWrapper>
        <I18nProvider locale={locale}>
          <EDSDatePicker {...props} ref={ref} formatOptions={formatOptions} />
        </I18nProvider>
        {props.meta && <Typography variant="meta">{props.meta}</Typography>}
      </DatePickerWrapper>
    );
  }
);

DatePicker.displayName = 'DatePicker';
