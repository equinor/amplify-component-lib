import { faker } from '@faker-js/faker';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ReleaseNote } from './ReleaseNote';

import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 3rem;
`;

const meta: Meta<typeof ReleaseNote> = {
  title: 'Organisms/ReleaseNote',
  component: ReleaseNote,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: '',
    },
  },
  decorators: (Story) => (
    <Wrapper>
      <Story />
    </Wrapper>
  ),
  args: {},
};

export default meta;
type Story = StoryObj<typeof ReleaseNote>;

export const Default: Story = {
  args: {
    releaseId: '1',
    applicationName: 'PWEX',
    title: 'Release note title',
    body: `<p>${faker.lorem.paragraphs(15)}</p>`,
    releaseDate: new Date('03/09/2024, 10:21').toISOString(),
    createdDate: new Date('03/09/2024, 10:21').toISOString(),
    tags: ['Bug fix', 'Improvement', 'Feature'],
  },
};

export const WithVersion: Story = {
  args: {
    releaseId: '1',
    version: '1.0.1',
    applicationName: 'PWEX',
    title: 'Release note title',
    body: `<p>${faker.lorem.paragraphs(15)}</p>`,
    releaseDate: new Date('03/09/2024, 10:21').toISOString(),
    createdDate: new Date('03/09/2024, 10:21').toISOString(),
    tags: ['Bug fix', 'Improvement', 'Feature'],
  },
};
