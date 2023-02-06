import { faker } from '@faker-js/faker';

import { render, screen } from '../../tests/test-utils';
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

  expect(mockedProps.name).not.toBeUndefined();

  const split = mockedProps.name?.split(' ') as string[];
  let initials: string[] = ['', ''];
  if (split && split.length === 1 && split[0].length >= 1) {
    initials = [split[0][0].toUpperCase(), ''];
  } else if (
    split &&
    split.length >= 2 &&
    split[0].length >= 1 &&
    split[split.length - 1].length >= 1
  ) {
    initials = [
      split[0][0].toUpperCase(),
      split[split.length - 1][0].toUpperCase(),
    ];
  }

  expect(screen.getByText(initials.join(''))).toBeInTheDocument();
});
