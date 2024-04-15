import PageNotFound from './PageNotFound';

import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  title: 'Feedback/PageNotFound',
  component: PageNotFound,
  decorators: [withRouter],
};

export const Primary = () => {
  return <PageNotFound />;
};
