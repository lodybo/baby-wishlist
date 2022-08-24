import type { User } from '~/models/user.server';
import type { Item } from '~/models/items.server';

interface BaseAction {
  action?: 'CLAIM' | 'UNCLAIM';
  userId?: User['id'];
  itemId?: Item['id'];
}

interface ClaimAction extends BaseAction {
  action: 'CLAIM';
}

interface UnclaimAction extends BaseAction {
  action: 'UNCLAIM';
}

export type Action = ClaimAction | UnclaimAction;
