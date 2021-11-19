import { ObjectType, Field, Resolver, Query } from 'type-graphql';

@ObjectType()
class Info {
  @Field()
  status!: string;

  @Field()
  time!: string;
}

@Resolver((_of) => Info)
export class InfoResolver {
  @Query((_returns) => Info)
  async info() {
    const info: Info = {
      status: 'ok',
      time: new Date().toISOString(),
    };
    return info;
  }
}
