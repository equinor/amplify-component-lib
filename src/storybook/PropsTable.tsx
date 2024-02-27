import { ArgsTable, PRIMARY_STORY } from '@storybook/addon-docs';

import PropTypes from 'prop-types';

export const PropsTable = ({ story = PRIMARY_STORY, ...props }) => (
  <ArgsTable story={story} {...props} />
);

PropsTable.propTypes = {
  story: PropTypes.string,
};
