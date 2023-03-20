import { faker } from '@faker-js/faker';

import { render, screen } from '../../../tests/test-utils';
import WorkflowDescription, {
  WorkflowDescriptionProps,
} from './WorkflowDescription';

function fakeOption(undefinedApprovedDate = false) {
  if (Math.random() > 0.5 || undefinedApprovedDate) {
    return {
      label: faker.datatype.uuid(),
      notApprovedLabel: faker.datatype.uuid(),
      approvedDate: undefined,
    };
  }
  return {
    label: faker.datatype.uuid(),
    approvedUser: faker.datatype.uuid(),
    approvedDate: faker.date.past().toISOString(),
    color: Math.random() > 0.5 ? faker.color.rgb() : undefined,
    backgroundColor: Math.random() > 0.5 ? faker.color.rgb() : undefined,
  };
}

function fakeProps(undefinedApprovedDate = false): WorkflowDescriptionProps {
  const fakeOptions: any = [];
  for (let i = 0; i < faker.datatype.number({ min: 2, max: 20 }); i++) {
    fakeOptions.push(fakeOption(undefinedApprovedDate));
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
    expect(option.children[option.children.length - 1]).toHaveAttribute(
      'color',
      approvedOptions[index].color ?? '#000000'
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
