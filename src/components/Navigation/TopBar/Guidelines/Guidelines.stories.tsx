import { Icon } from '@equinor/eds-core-react';
import {
  assignment,
  check,
  info_circle,
  minimize,
  notifications,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { Meta, StoryFn } from '@storybook/react';

import Guidelines from './index';

const { colors } = tokens;

const Wrapper = styled.div`
  height: 35rem;
  > div {
    top: 0;
    height: 100%;
  }
`;

export default {
  title: 'Navigation/TopBar/Guidelines',
  component: Guidelines,
} as Meta;

import { actions } from '@storybook/addon-actions';

import styled from 'styled-components';
export const Primary: StoryFn = () => {
  const handleOnClose = () => {
    actions('onClose').onClose('Ran on close');
  };

  return (
    <Wrapper>
      <Guidelines open onClose={handleOnClose}>
        <Guidelines.Section title="Top bar">
          <Guidelines.Item title="Notifications">
            <Icon
              data={notifications}
              color={colors.interactive.primary__resting.hex}
            />
          </Guidelines.Item>
          <Guidelines.Item title="Guidelines">
            <Icon
              data={info_circle}
              color={colors.interactive.primary__resting.hex}
            />
          </Guidelines.Item>
        </Guidelines.Section>
        <Guidelines.Section title="Status">
          <Guidelines.Item title="Yes">
            <Icon data={check} color="#77ff72" />
          </Guidelines.Item>
          <Guidelines.Item title="No">
            <Icon data={minimize} color="#ff8484" />
          </Guidelines.Item>
        </Guidelines.Section>
        <Guidelines.Section title="Navigation rail">
          <Guidelines.Item title="Report">
            <Guidelines.Colorbox $color="#ff8484" />
            <Icon data={assignment} color="#ff8484" />
          </Guidelines.Item>
        </Guidelines.Section>
      </Guidelines>
    </Wrapper>
  );
};
