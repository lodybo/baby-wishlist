import type { User, Item } from '@prisma/client';

import { prisma } from '~/db.server';

export type { Item } from '@prisma/client';

export function getItem({ id }: Pick<Item, 'id'>) {
  return prisma.item.findFirst({
    where: { id },
  });
}

export function getItemList() {
  return prisma.item.findMany({
    orderBy: { updatedAt: 'desc' },
  });
}

export function getItemsByUser({ id }: { id: User['id']}) {
  return prisma.item.findMany({
    orderBy: { updatedAt: 'desc' },
    where: {
      claimId: id,
    },
  })
}

export function createItem({
  name,
  description,
  amount,
  tags,
  imageUrl,
  userId,
}: Pick<Item, 'name' | 'description' | 'amount' | 'tags' | 'imageUrl'> & {
  userId: User['id'];
}) {
  return prisma.item.create({
    data: {
      name,
      description,
      amount,
      tags,
      imageUrl,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteItem({ id }: Pick<Item, 'id'>) {
  return prisma.item.deleteMany({
    where: { id },
  });
}

export function getItemClaimStatus({ itemId }: { itemId: Item['id'] }) {
  return prisma.item.findFirst({
    where: { id: itemId },
    select: {
      claimId: true,
    }
  });
}

export function claimItem({
  itemId,
  claimUserId,
}: {
  itemId: Item['id'];
  claimUserId: User['id'];
}) {
  return prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      claimId: claimUserId,
    },
  });
}

export function unclaimItem({ itemId }: { itemId: Item['id'] }) {
  return prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      claimId: null,
    },
  });
}
