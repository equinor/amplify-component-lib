import { Unauthorized } from './Unauthorized';

export default {
  title: 'Organisms/ErrorPage/Collections/Unauthorized',
  component: Unauthorized,
  env: (config: []) => ({
    ...config,
    NAME: '{AppName}',
  }),
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/fk8AI59x5HqPCBg4Nemlkl/%F0%9F%92%A0-Component-Library---Amplify?type=design&node-id=5694-19929&mode=design&t=jlQAMMWK1GLpzcAL-4',
    },
  },
};

export const Primary = () => {
  return <Unauthorized />;
};
