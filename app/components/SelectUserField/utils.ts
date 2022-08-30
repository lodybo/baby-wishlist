import type { User } from '~/models/user.server';

export const findUser = (users: User[], user: User) => users.find(u => u.id === user.id);
