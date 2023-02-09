import type { Password, User as PrismaUser } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { prisma } from '~/db.server';

export type User = Omit<PrismaUser, 'createdAt' | 'updatedAt'>;

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function createUser(
  name: User['name'],
  email: User['email'],
  password: string,
  role: User['role'],
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      role,
    },
  });
}

export async function editUser({
  id,
  name,
  email,
}: {
  id: User['id'];
  name: User['name'];
  email: User['email'];
}) {
  return prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });
}

export async function editUserRole({
  id,
  newRole,
}: {
  id: User['id'];
  newRole: User['role'];
}) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      role: newRole,
    },
  });
}

export async function editUserPassword({
  id,
  newPassword,
}: {
  id: User['id'];
  newPassword: string;
}) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return prisma.user.update({
    where: { id },
    data: {
      password: {
        update: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User['email']) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User['email'],
  password: Password['hash'],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash,
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export const findUser = (users: User[], user: User) =>
  users.find((u) => u.id === user.id);
