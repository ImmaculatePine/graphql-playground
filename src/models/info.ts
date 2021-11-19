import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Info {
  @Field()
  status!: string;

  @Field()
  startedAt!: string;
}
