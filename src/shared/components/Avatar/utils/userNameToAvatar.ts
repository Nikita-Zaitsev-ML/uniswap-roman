const userNameToAvatar = (userName: string) => {
  const words = / /.test(userName) ? userName.split(' ') : [userName];

  const result = words
    .reduce((acc, word) => {
      return `${acc}${word[0]}`;
    }, '')
    .toUpperCase();

  return result;
};

export { userNameToAvatar };
