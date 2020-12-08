import bcrypt from 'bcryptjs';

export const hashPassword = async password => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const comparePasswords = (test, password) => {
  return bcrypt.compareSync(test, password);
};
