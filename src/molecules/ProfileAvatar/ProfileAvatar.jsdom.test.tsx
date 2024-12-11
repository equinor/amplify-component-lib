import { faker } from '@faker-js/faker';

import {
  nameToInitials,
  ProfileAvatar,
  ProfileAvatarProps,
} from 'src/molecules/ProfileAvatar/ProfileAvatar';
import { render, screen } from 'src/tests/jsdomtest-utils';

import { expect } from 'vitest';

const sizeOptions: ProfileAvatarProps['size'][] = [
  'small',
  'small-medium',
  'medium',
  'large',
  'x-large',
  undefined,
  60,
];

function mockProfileAvatarProps(image: boolean): ProfileAvatarProps {
  return {
    name: faker.person.fullName(),
    url: image ? faker.image.url() : undefined,
  };
}

test('Renders image when given and in correct sizing', () => {
  const mockedProps = mockProfileAvatarProps(true);
  const { rerender } = render(<ProfileAvatar {...mockedProps} />);
  const sizeToPx = (size: ProfileAvatarProps['size']) => {
    switch (size) {
      case 'small':
        return 16;
      case 'small-medium':
        return 24;
      case 'medium':
      case undefined:
        return 32;
      case 'large':
        return 40;
      case 'x-large':
        return 48;
      default:
        return size;
    }
  };

  for (const size of sizeOptions) {
    rerender(<ProfileAvatar {...mockedProps} size={size} />);
    const avatar = screen.getByTestId('avatar-wrapper');
    const expectedSize = sizeToPx(size);
    expect(avatar).toHaveStyle(`width: ${expectedSize}px`);
    expect(avatar).toHaveStyle(`height: ${expectedSize}px`);
  }
});

test('nameToInitials works correct with names containing commas', () => {
  const nameWithComma = 'Name, Nameson';

  expect(nameToInitials(nameWithComma)).toBe('NN');
});
