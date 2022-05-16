import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const withRouter = (Story, context) => {
  const url = context?.parameters?.nextRouter?.url || '/';

  return (
    <MemoryRouterProvider url={url}>
      <Story />
    </MemoryRouterProvider>
  );
};

export { withRouter };
