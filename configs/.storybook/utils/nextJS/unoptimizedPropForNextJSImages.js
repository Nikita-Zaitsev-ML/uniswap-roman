import * as NextImage from 'next/image';

const unoptimizedPropForNextJSImages = () => {
  const OriginalNextImage = NextImage.default;

  Object.defineProperty(NextImage, 'default', {
    configurable: true,
    value: (props) => <OriginalNextImage {...props} unoptimized />,
  });
};

export { unoptimizedPropForNextJSImages };
