import { DefaultLayout } from 'src/modules/shared/pageTemplates';

const withLayout = (Story, context) => {
  const { component } = context;
  const getLayout =
    component.getLayout ||
    ((children) => <DefaultLayout>{children}</DefaultLayout>);

  return getLayout(<Story />);
};

export { withLayout };
