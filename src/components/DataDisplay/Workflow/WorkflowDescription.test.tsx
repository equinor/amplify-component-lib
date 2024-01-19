import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import WorkflowDescription, {
  WorkflowDescriptionProps,
} from './WorkflowDescription';

function fakeOption(undefinedApprovedDate = false, withColor = false) {
  if (Math.random() > 0.5 || undefinedApprovedDate) {
    return {
      label: faker.string.uuid(),
      notApprovedLabel: faker.string.uuid(),
      approvedDate: undefined,
    };
  }
  return {
    label: faker.string.uuid(),
    approvedUser: faker.string.uuid(),
    approvedDate: faker.date.past().toISOString(),
    color: withColor ? faker.color.rgb() : undefined,
    backgroundColor: withColor ? faker.color.rgb() : undefined,
  };
}

function fakeProps(
  undefinedApprovedDate = false,
  withColor = false
): WorkflowDescriptionProps {
  const fakeOptions: any = [];
  for (let i = 0; i < faker.number.int({ min: 2, max: 20 }); i++) {
    fakeOptions.push(fakeOption(undefinedApprovedDate, withColor));
  }
  return {
    options: fakeOptions,
  };
}

test('Renders the flow correctly', async () => {
  const props = fakeProps();
  render(<WorkflowDescription {...props} />);

  const approvedOptions = props.options.filter(
    (option) => option.approvedDate !== undefined
  );
  const approvedElements = screen.queryAllByTestId('approved');
  for (const [index, option] of approvedElements.entries()) {
    expect(
      screen.getByText(approvedOptions[index].approvedUser ?? 'failed')
    ).toBeInTheDocument();
    expect(
      screen.getByText(approvedOptions[index].approvedDate ?? 'failed')
    ).toBeInTheDocument();
    expect(
      screen.getByText(approvedOptions[index].label ?? 'failed')
    ).toBeInTheDocument();
    expect(option.children[option.children.length - 1]).toHaveStyleRule(
      'background',
      approvedOptions[index].backgroundColor
    );
  }

  const notApprovedOptions = props.options.filter(
    (option) => option.approvedDate === undefined
  );
  for (let i = 0; i < notApprovedOptions.length; i++) {
    expect(
      screen.getByText(notApprovedOptions[i].notApprovedLabel ?? 'failed')
    ).toBeInTheDocument();
    expect(
      screen.getByText(notApprovedOptions[i].label ?? 'failed')
    ).toBeInTheDocument();
  }
});

test('Renders undefined approved dates properly flow correctly', async () => {
  const props = fakeProps(true);
  render(<WorkflowDescription {...props} />);

  const notApprovedOptions = props.options.filter(
    (option) => option.approvedDate === undefined
  );
  for (let i = 0; i < notApprovedOptions.length; i++) {
    expect(
      screen.getByText(notApprovedOptions[i].notApprovedLabel ?? 'failed')
    ).toBeInTheDocument();
    expect(
      screen.getByText(notApprovedOptions[i].label ?? 'failed')
    ).toBeInTheDocument();
  }
});

test('Renders with color approved dates properly flow correctly', async () => {
  const props = fakeProps(false, true);
  render(<WorkflowDescription {...props} />);

  const approvedOptions = props.options.filter(
    (option) => option.approvedDate !== undefined
  );
  const approvedElements = screen.queryAllByTestId('approved');
  for (const [index, option] of approvedElements.entries()) {
    expect(
      screen.getByText(approvedOptions[index].approvedUser ?? 'failed')
    ).toBeInTheDocument();
    expect(
      screen.getByText(approvedOptions[index].approvedDate ?? 'failed')
    ).toBeInTheDocument();
    expect(
      screen.getByText(approvedOptions[index].label ?? 'failed')
    ).toBeInTheDocument();
    expect(option.children[option.children.length - 1]).toHaveStyleRule(
      'border',
      `0.063em solid ${approvedOptions[index].color}`
    );
  }
});

test('Renders with fallback color', async () => {
  const props = fakeProps(false, false);
  render(<WorkflowDescription {...props} />);

  const approvedOptions = props.options.filter(
    (option) => option.approvedDate !== undefined
  );
  const approvedElements = screen.queryAllByTestId('approved');
  for (const [index, option] of approvedElements.entries()) {
    expect(
      screen.getByText(approvedOptions[index].approvedUser ?? 'failed')
    ).toBeInTheDocument();
    expect(
      screen.getByText(approvedOptions[index].approvedDate ?? 'failed')
    ).toBeInTheDocument();
    expect(
      screen.getByText(approvedOptions[index].label ?? 'failed')
    ).toBeInTheDocument();
    expect(option.children[option.children.length - 1]).toHaveStyleRule(
      'border',
      `0.063em solid var(--eds_text__static_icons__secondary, rgba(86, 86, 86, 1))`
    );
  }
});
