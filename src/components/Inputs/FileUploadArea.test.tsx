import { upload } from '@equinor/eds-icons';

import { render, screen } from '../../tests/test-utils';
import { FileUploadArea } from '../index';

function fakeProps() {
  return {
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'text/csv': ['.csv'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        ['.pptx'],
    },
  };
}

test('Renders text and icon as it should', () => {
  const props = fakeProps();
  render(<FileUploadArea {...props} />);

  const icons = screen.getAllByTestId('eds-icon-path');
  const text = screen.getByText('browse');

  expect(icons[0]).toHaveAttribute('d', upload.svgPathData);
  expect(text).toBeVisible();
});
