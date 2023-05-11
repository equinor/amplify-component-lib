import Unauthorized from './Unauthorized';

export default {
  title: 'Feedback/Unauthorized',
  component: Unauthorized,
  env: (config: any) => ({
    ...config,
    NAME: '{AppName}',
  }),
};

export const Primary = () => {
  return <Unauthorized />;
};
