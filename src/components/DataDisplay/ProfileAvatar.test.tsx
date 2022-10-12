import { faker } from '@faker-js/faker';

import { render, screen } from '../../test-utils';
import ProfileAvatar, { ProfileAvatarProps } from './ProfileAvatar';

function mockProfileAvatarProps(image: boolean): ProfileAvatarProps {
  return {
    name: `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`,
    url: image ? faker.image.imageUrl() : undefined,
  };
}

test('Renders image when given', () => {
  const mockedProps = mockProfileAvatarProps(true);
  render(<ProfileAvatar {...mockedProps} />);

  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('Renders first and last letter of name when image is not given', () => {
  const mockedProps = mockProfileAvatarProps(false);
  render(<ProfileAvatar {...mockedProps} />);
  if (mockedProps.name) {
    const split = mockedProps.name.split(' ');
    const initials = split[0][0] + split[split.length - 1][0];

    // eslint-disable-next-line jest/no-conditional-expect
    expect(screen.getByText(initials)).toBeInTheDocument();
  }
});
