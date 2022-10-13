import type { User, Item as PrismaItem } from '@prisma/client';

import { prisma } from '~/db.server';

export type Item = Omit<PrismaItem, 'createdAt' | 'updatedAt'>;
export type SerializedItem = Omit<Item, 'amount'> & {
  amount: string | null;
};

export function getItem({ id }: Pick<Item, 'id'>) {
  return prisma.item.findFirst({
    where: { id },
  });
}

export function getItemList(params?: { includeClaimedUser: boolean }) {
  return prisma.item.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      claimUser: params?.includeClaimedUser,
    },
  });
}

export function getItemsByUser({ id }: { id: User['id'] }) {
  return prisma.item.findMany({
    orderBy: { updatedAt: 'desc' },
    where: {
      claimId: id,
    },
  });
}

export function getItemsByTag({ tag }: { tag: string }) {
  return prisma.item.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      tags: {
        has: tag,
      },
    },
  });
}

export function createItem({
  name,
  description,
  amount,
  tags,
  imageUrl,
  userId,
}: Pick<Item, 'name' | 'description' | 'tags' | 'imageUrl'> & {
  amount: number;
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

export function editItem({
  id,
  amount,
  description,
  imageUrl,
  name,
  tags,
  userId,
}: Omit<Item, 'amount' | 'claimId' | 'claimed'> & {
  amount: number;
}) {
  return prisma.item.update({
    where: {
      id,
    },
    data: {
      name,
      amount,
      imageUrl,
      tags,
      description,
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
    },
  });
}

export function claimItem({
  itemId,
  claimUserId,
}: {
  itemId: Item['id'];
  claimUserId: User['id'] | undefined;
}) {
  return prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      claimed: true,
      claimId: claimUserId || null,
    },
  });
}

export function unclaimItem({ itemId }: { itemId: Item['id'] }) {
  return prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      claimed: false,
      claimId: null,
    },
  });
}
