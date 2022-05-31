const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 2 ** 24).toString(16)}`;
};

export { getRandomColor };
