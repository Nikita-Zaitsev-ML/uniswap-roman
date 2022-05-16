const percentageOf = (max: number) => {
  return (px: number) => (px / max) * 100;
};

export { percentageOf };
