import { faker } from '@faker-js/faker';

import { ReleaseNote } from 'src/organisms/ReleaseNote/ReleaseNote';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

function fakeReleaseNote() {
  return {
    releaseId: '1',
    applicationName: faker.book.title(),
    title: faker.commerce.productName(),
    body: `<p>${faker.lorem.paragraphs(15)}</p>`,
    releaseDate: new Date('03/09/2024, 10:21').toISOString(),
    createdDate: new Date('04/09/2024, 10:21').toISOString(),
    tags: ['Bug fix', 'Improvement', 'Feature'],
    draft: false,
  };
}

test('Shows expected content', async () => {
  const props = fakeReleaseNote();
  render(<ReleaseNote {...props} />);
  expect(screen.getByText(props.title)).toBeInTheDocument();
  expect(screen.getByText(props.applicationName)).toBeInTheDocument();
  for (const tag of props.tags) {
    expect(screen.getByText(tag)).toBeInTheDocument();
  }
  expect(screen.getByText(/min read/i)).toBeInTheDocument();
  // Release date
  expect(screen.getByText(/march/i)).toBeInTheDocument();
});

test('Shows expected created date if release date does not exist', async () => {
  const props = fakeReleaseNote();
  render(<ReleaseNote {...props} releaseDate={undefined} />);
  // Created date
  expect(screen.getByText(/april/i)).toBeInTheDocument();
});

test('Shows version if it has it', async () => {
  const props = fakeReleaseNote();
  const version = faker.system.semver();
  render(<ReleaseNote {...props} version={version} />);

  expect(screen.getByText(new RegExp(version))).toBeInTheDocument();
});

test('Able to expand it', async () => {
  const props = fakeReleaseNote();
  render(<ReleaseNote {...props} />);

  const user = userEvent.setup();

  const showMoreButton = await screen.findByRole('button', { name: /more/i });
  expect(showMoreButton).toBeInTheDocument();
  await user.click(showMoreButton);

  const showLessButton = screen.getByRole('button', { name: /less/i });
  expect(showLessButton).toBeInTheDocument();
  await user.click(showLessButton);
});

test('Has expand button if it contains img', async () => {
  const props = fakeReleaseNote();
  render(<ReleaseNote {...props} body={`<img src="hei" alt="hei" >`} />);

  const showMoreButton = await screen.findByRole('button', { name: /more/i });
  expect(showMoreButton).toBeInTheDocument();
});

test('Settings startExpanded works as expected', async () => {
  const props = fakeReleaseNote();
  render(<ReleaseNote {...props} startExpanded />);

  const user = userEvent.setup();

  const showLessButton = await screen.findByRole('button', { name: /less/i });
  expect(showLessButton).toBeInTheDocument();
  await user.click(showLessButton);

  const showMoreButton = screen.getByRole('button', { name: /more/i });
  expect(showMoreButton).toBeInTheDocument();
  await user.click(showMoreButton);
});
