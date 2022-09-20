import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CommentServiceDto } from '../dto/comment-service.dto';
import { PageSchema } from './page.schema';
import { PostSchema } from './post.schema';

@ObjectType()
export class CommentSchema {
  private _id: string;
  private _content: string;
  private _authorName: string;

  @Field(() => ID)
  get id(): string {
    return this._id;
  }

  @Field(() => String)
  get content(): string {
    return this._content;
  }

  @Field(() => String)
  get authorName(): string {
    return this._authorName;
  }

  static of(dto: CommentServiceDto) {
    const schema = new CommentSchema();

    schema._id = dto.id + '';
    schema._content = dto.content;
    schema._authorName = dto.authorName;

    return schema;
  }
}

@ObjectType()
export class CommentPageSchema extends PageSchema<CommentSchema>(
  CommentSchema,
) {
  private _pageSize: number;
  private _totalCount: number;
  private _schemas: CommentSchema[];

  constructor(
    pageSize: number,
    totalCount: number,
    postSchemas: CommentSchema[],
  ) {
    super();
    this._pageSize = pageSize;
    this._totalCount = totalCount;
    this._schemas = postSchemas;
  }

  pagination(): any {
    return {
      totalCount: this._totalCount,
      count: this._schemas.length,
      edges: this.setNode(),
    };
  }

  private setNode() {
    return this._schemas.map((item) => ({
      node: item,
    }));
  }
}
