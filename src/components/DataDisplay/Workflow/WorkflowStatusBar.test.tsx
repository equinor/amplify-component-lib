import { faker } from '@faker-js/faker';

import { render, screen, test } from '../../../test-utils';
import WorkflowStatusBar, { WorkflowStatusBarProps } from './WorkflowStatusBar';

function fakeOption() {
  return {
    color: faker.color.rgb(),
    backgroundColor: faker.color.rgb(),
    label: faker.animal.lion(),
    value: faker.datatype.uuid(),
  };
}

function fakeProps(
  highlightActiveNode = false,
  showAlert = false
): WorkflowStatusBarProps {
  const options: any = [];
  for (let i = 0; i < faker.datatype.number({ min: 2, max: 10 }); i++) {
    options.push(fakeOption());
  }
  return {
    options,
    activeNode: options[0].value,
    showAlert,
    highlightActiveNode,
  };
}

test('Shows expected colors on nodes', async () => {
  const props = fakeProps(true);
  render(<WorkflowStatusBar {...props} />);

  const options = screen.getAllByTestId('workflow-option');
  for (const [index, option] of options.entries()) {
    const colorIndex = option.children.length - 1;
    expect(option.children[colorIndex]).toHaveAttribute(
      'color',
      props.options[index].color
    );
  }
});
test('Shows expected active node', async () => {
  const props = fakeProps(true);
  render(<WorkflowStatusBar {...props} />);

  const activeEl = screen.getByTestId('active');
  expect(activeEl).toBeInTheDocument();
});

test('Shows expected alert node', async () => {
  const props = fakeProps(false, true);
  render(<WorkflowStatusBar {...props} />);

  const alertEl = screen.getByTestId('alert');
  expect(alertEl).toBeInTheDocument();
});
