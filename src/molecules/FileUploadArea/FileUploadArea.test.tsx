import { folder } from '@equinor/eds-icons';

import { FileUploadArea } from '../index';
import { render, screen } from 'src/tests/browsertest-utils';

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

  const icons = screen.getByTestId('eds-icon-path');
  const text = screen.getByText(/browse files/i);

  expect(icons).toHaveAttribute('d', folder.svgPathData);
  expect(text).toBeVisible();
});

test('Renders compact style as it should', () => {
  const props = fakeProps();
  render(<FileUploadArea size="small" {...props} />);

  const text = screen.queryByText('browse');

  expect(screen.getByTestId('upload-illustration')).toBeInTheDocument();
  expect(text).toBeNull();
});
