import {
  fault,
  grid_layer,
  hill_shading,
  invert,
  well,
} from '@equinor/eds-icons';
import { faker } from '@faker-js/faker';

import { render, screen } from '../../../test-utils';
import { Guidelines, IGuidelineProps, IGuidelineSections } from './Guidelines';

function fakeSection(): IGuidelineSections {
  const items: IGuidelineSections['items'] = [];
  for (let i = 0; i < faker.datatype.number({ min: 2, max: 10 }); i++) {
    items.push({
      title: faker.datatype.uuid(),
      icon: faker.helpers.arrayElement([
        invert,
        fault,
        grid_layer,
        well,
        hill_shading,
      ]),
      color: faker.color.rgb(),
    });
  }

  return {
    sectionName: faker.animal.cow(),
    items,
  };
}

function fakeProps(): IGuidelineProps {
  const sections: IGuidelineSections[] = [];
  for (let i = 0; i < faker.datatype.number({ min: 2, max: 5 }); i++) {
    sections.push(fakeSection());
  }
  return {
    open: true,
    onClose: jest.fn(),
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
