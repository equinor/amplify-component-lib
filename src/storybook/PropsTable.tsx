import { ArgTypes, PRIMARY_STORY } from '@storybook/addon-docs/blocks';

import PropTypes from 'prop-types';

export const PropsTable = ({ story = PRIMARY_STORY, ...props }) => (
  <ArgTypes of={story} {...props} />
);

PropsTable.propTypes = {
  story: PropTypes.string,
};
