import { faker } from '@faker-js/faker';

import { render, screen } from '../../../test-utils';
import WorkflowDescription, {
  WorkflowDescriptionProps,
} from './WorkflowDescription';

function fakeOption() {
  if (Math.random() > 0.5) {
    return {
      label: faker.datatype.uuid(),
      notApprovedLabel: faker.datatype.uuid(),
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

function fakeProps(): WorkflowDescriptionProps {
  const fakeOptions: any = [];
  for (let i = 0; i < faker.datatype.number({ min: 2, max: 20 }); i++) {
    fakeOptions.push(fakeOption());
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
