import {
  fault,
  grid_layer,
  hill_shading,
  invert,
  well,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import { GuidelineProps, Guidelines, GuidelineSections } from './Guidelines';

function fakeSection(withColorBoxes = false): GuidelineSections {
  const items: GuidelineSections['items'] = [];
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
      colorBox: withColorBoxes ? faker.color.rgb() : undefined,
    });
  }

  return {
    sectionName: faker.string.uuid(),
    items,
  };
}

function fakeProps(withColorBoxes = false): GuidelineProps {
  const sections: GuidelineSections[] = [];
  for (let i = 0; i < faker.number.int({ min: 2, max: 5 }); i++) {
    sections.push(fakeSection(withColorBoxes));
  }
  return {
    open: true,
    onClose: vi.fn(),
    sections,
  };
}

test('Renders content correctly', async () => {
  const props = fakeProps();
  render(<Guidelines {...props} />);

  const sections = screen.getAllByTestId('guidelines-section');

  const allIcons = screen.getAllByTestId('eds-icon-path');
  let iconIndex = 1;
  for (const [index, section] of sections.entries()) {
    expect(section).toContainElement(
      screen.getByText(props.sections[index].sectionName)
    );
    for (const item of props.sections[index].items) {
      expect(section).toContainElement(screen.getByText(item.title));
      expect(section).toContainElement(allIcons[iconIndex]);
      iconIndex += 1;
    }
  }
});

test('Renders sections as expected with color boxes correctly', async () => {
  const props = fakeProps(true);
  render(<Guidelines {...props} />);

  for (const section of props.sections) {
    for (const item of section.items) {
      expect(screen.getByTestId(`color-box-${item.title}`)).toBeInTheDocument();
      expect(screen.getByTestId(`color-box-${item.title}`)).toBeVisible();
    }
  }
});

test('is not shown if open is false', async () => {
  const props = fakeProps(true);
  render(<Guidelines {...props} open={false} />);

  const panelHeader = screen.queryByText('Guidelines');
  expect(panelHeader).not.toBeInTheDocument();
});

test('Shows ItemElement types in the guidelines', async () => {
  const props = fakeProps(false);
  const itemElement = {
    title: faker.animal.fish(),
    element: <p>custom element</p>,
  };
  props.sections[0].items.push(itemElement);
  render(<Guidelines {...props} open />);

  expect(screen.getByText('custom element')).toBeInTheDocument();
  expect(screen.getByText(itemElement.title)).toBeInTheDocument();
});
