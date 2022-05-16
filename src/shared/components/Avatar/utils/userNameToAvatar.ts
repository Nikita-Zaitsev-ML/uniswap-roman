const userNameToAvatar = (userName: string) => {
  const result = `${userName.split(' ')[0][0]}${
    userName.split(' ')[1][0]
  }`.toUpperCase();

  return result;
};

export { userNameToAvatar };
