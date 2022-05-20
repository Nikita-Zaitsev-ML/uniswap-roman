import { ethers } from 'ethers';

const initContract = (
  parameters: ConstructorParameters<typeof ethers.Contract>
) => {
  const contract = new ethers.Contract(...parameters);

  return contract;
};

export { initContract };
