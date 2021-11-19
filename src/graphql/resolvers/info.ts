import { Resolver, Query } from 'type-graphql';

import { Info } from '../../models/info';

const serverStartedAt = new Date();
const info = {
  status: 'ok',
  startedAt: serverStartedAt.toISOString(),
};

@Resolver((_of) => Info)
export class InfoResolver {
  @Query((_returns) => Info)
  async info() {
    return info;
  }
}
