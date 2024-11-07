import { OldPageNotFound } from 'src/deprecated/ErrorPage/collections/OldPageNotFound';

import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  title: 'Deprecated/ErrorPage/Collections/PageNotFound',
  component: OldPageNotFound,
  decorators: [withRouter],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19854&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
};

export const Primary = () => {
  return <OldPageNotFound />;
};
