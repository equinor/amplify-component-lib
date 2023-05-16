import PageNotFound from './PageNotFound';

import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'Feedback/PageNotFound',
  component: PageNotFound,
  decorators: [withRouter],
};

export const Primary = () => {
  return <PageNotFound />;
};
