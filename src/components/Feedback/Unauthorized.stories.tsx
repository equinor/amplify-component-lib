import Unauthorized from './Unauthorized';

export default {
  title: 'Feedback/Unauthorized',
  component: Unauthorized,
  env: (config: []) => ({
    ...config,
    NAME: '{AppName}',
  }),
};

export const Primary = () => {
  return <Unauthorized />;
};
