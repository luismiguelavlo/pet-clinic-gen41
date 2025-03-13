import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

export const encriptAdapter = {
  hash: (password: string) => {
    const salt = genSaltSync(12);
    return hashSync(password, salt);
  },
};
