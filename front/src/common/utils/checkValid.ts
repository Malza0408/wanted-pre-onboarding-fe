const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const checkEmail = (email: string) => {
  return email.match(regexp);
};

const checkPassword = (password: string) => {
  return password.length >= 8;
};

export { checkEmail, checkPassword };
