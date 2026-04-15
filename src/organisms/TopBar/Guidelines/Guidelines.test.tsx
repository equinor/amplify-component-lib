import {
  fault,
  grid_layer,
  hill_shading,
  invert,
  well,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { Guidelines } from './Guidelines';
import { ElementItem, IconItem } from 'src/atoms/types/Guidelines';
import { render, screen, userEvent } from 'src/tests/browsertest-utils';

function fakeSection(withColorBoxes = false) {
  const items: (IconItem | ElementItem)[] = [];
  for (let i = 0; i < faker.number.int({ min: 2, max: 10 }); i++) {
    items.push({
      title: faker.string.uuid(),
      icon: faker.helpers.arrayElement([
        invert,
        fault,
        grid_layer,
        well,
        hill_shading,
      ]),
      color: faker.color.rgb(),
      colorBox: withColorBoxes,
    });
  }

  return {
    sectionName: faker.string.uuid(),
    items,
  };
}

function fakeProps(withColorBoxes = false) {
  const sections = [];
  for (let i = 0; i < faker.number.int({ min: 2, max: 5 }); i++) {
    sections.push(fakeSection(withColorBoxes));
  }
  return {
    sections,
  };
}

test('Renders content correctly', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Guidelines {...props} />);
  const button = screen.getByRole('button');
  await user.click(button);

  const sections = screen.getAllByTestId('guidelines-section');

  for (const [index, section] of sections.entries()) {
    expect(section).toContainElement(
      screen.getByText(props.sections[index].sectionName)
    );
    for (const item of props.sections[index].items) {
      expect(section).toContainElement(screen.getByText(item.title));
    }
  }
});

test('Closes when user click outside', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Guidelines {...props} />);

  const button = screen.getByRole('button');
  await user.click(button);

  const sections = screen.getAllByTestId('guidelines-section');

  for (const [index, section] of sections.entries()) {
    expect(section).toContainElement(
      screen.getByText(props.sections[index].sectionName)
    );
    for (const item of props.sections[index].items) {
      expect(section).toContainElement(screen.getByText(item.title));
    }
  }

  await user.click(document.body);

  expect(screen.queryByTestId('guidelines-section')).not.toBeInTheDocument();
});
test('Closes when user click on icon again ', async () => {
  const props = fakeProps();
  const user = userEvent.setup();
  render(<Guidelines {...props} />);

  const button = screen.getByRole('button');
  await user.click(button);

  const sections = screen.getAllByTestId('guidelines-section');

  for (const [index, section] of sections.entries()) {
    expect(section).toContainElement(
      screen.getByText(props.sections[index].sectionName)
    );
    for (const item of props.sections[index].items) {
      expect(section).toContainElement(screen.getByText(item.title));
    }
  }

  await user.click(button);

  expect(screen.queryByTestId('guidelines-section')).not.toBeInTheDocument();
});

test('Renders sections as expected with color boxes correctly', async () => {
  const props = fakeProps(true);
  const user = userEvent.setup();
  render(<Guidelines {...props} />);

  const button = screen.getByRole('button');
  await user.click(button);

  for (const section of props.sections) {
    for (const item of section.items) {
      expect(screen.getByTestId(`color-box-${item.title}`)).toBeInTheDocument();
      expect(screen.getByTestId(`color-box-${item.title}`)).toBeVisible();
    }
  }
});

test('Shows custom elements', async () => {
  const props = fakeProps(false);
  const text = faker.animal.lion();
  const itemElement = {
    title: faker.animal.insect(),
    element: <p>{text}</p>,
  };
  props.sections[0].items.push(itemElement);
  const user = userEvent.setup();
  render(<Guidelines {...props} />);
  const button = screen.getByRole('button');
  await user.click(button);

  expect(screen.getByText(text)).toBeInTheDocument();
  expect(screen.getByText(itemElement.title)).toBeInTheDocument();
});

test('Shows custom item element', async () => {
  const text = faker.animal.lion();
  const props = {
    sections: [
      {
        sectionName: faker.animal.cat(),
        items: [<p key={'item'}>{text}</p>],
      },
    ],
  };
  const user = userEvent.setup();
  render(<Guidelines {...props} />);
  const button = screen.getByRole('button');
  await user.click(button);

  expect(screen.getByText(text)).toBeInTheDocument();
  expect(screen.getByText(props.sections[0].sectionName)).toBeInTheDocument();
});
