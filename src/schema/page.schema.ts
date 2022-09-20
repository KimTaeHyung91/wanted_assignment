import { Field, Int, ObjectType } from '@nestjs/graphql';
export function PageSchema<ItemType>(ItemClass): any {
  @ObjectType(`Paginated${ItemClass.name}Edge`, { isAbstract: true })
  abstract class Edge {
    @Field(() => ItemClass, { description: `${ItemClass.name}Edge` })
    public node: ItemType;
  }

  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => Int)
    public totalCount: number;

    @Field(() => Int)
    public count: number;

    @Field(() => [Edge])
    public edges: Edge[];
  }

  return PageClass;
}
