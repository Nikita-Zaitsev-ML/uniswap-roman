/**
 *
 * @param props {{background: React.CSSProperties['background']}}}
 * @returns
 */
const Wrapper = (props) => {
  const { children, background } = props;
  const style = { background, height: '100%' };

  return <div style={style}>{children}</div>;
};

export { Wrapper };
