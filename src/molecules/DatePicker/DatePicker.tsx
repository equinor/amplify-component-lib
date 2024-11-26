import { forwardRef } from 'react';
import { I18nProvider } from 'react-aria';

import {
  DatePicker as EDSDatePicker,
  DatePickerProps,
} from '@equinor/eds-core-react';

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
      <I18nProvider locale={locale}>
        <EDSDatePicker {...props} ref={ref} formatOptions={formatOptions} />
      </I18nProvider>
    );
  }
);

DatePicker.displayName = 'DatePicker';
