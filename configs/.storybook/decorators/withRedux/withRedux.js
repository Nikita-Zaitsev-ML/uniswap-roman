import { wrapper } from 'src/app/store';

const withRedux = (Story) => {
  const WithReduxStory = wrapper.withRedux(Story);

  return <WithReduxStory />;
};

export { withRedux };
