import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostServiceDto } from '../dto/post-service.dto';
import { PageSchema } from './page.schema';

@ObjectType()
export class PostSchema {
  private _id: string;
  private _title: string;
  private _content: string;
  private _authorName: string;
  private _password: string;
  private _createAt: Date;
  private _updateAt: Date;

  @Field(() => ID)
  get id(): string {
    return this._id;
  }

  @Field(() => String)
  get title(): string {
    return this._title;
  }

  @Field(() => String)
  get content(): string {
    return this._content;
  }

  @Field(() => String)
  get authoeName(): string {
    return this._authorName;
  }

  @Field(() => String)
  get password(): string {
    return this._password;
  }

  @Field(() => Date)
  get createAt(): Date {
    return this._createAt;
  }

  @Field(() => Date)
  get updateAt(): Date {
    return this._updateAt;
  }

  static of(dto: PostServiceDto) {
    const schema = new PostSchema();

    schema._id = dto.id + '';
    schema._title = dto.title;
    schema._content = dto.content;
    schema._authorName = dto.authorName;
    schema._password = dto.password;
    schema._createAt = dto.createAt;
    schema._updateAt = dto.updateAt;

    return schema;
  }
}

@ObjectType()
export class PostPageSchema extends PageSchema<PostSchema>(PostSchema) {
  private _pageSize: number;
  private _totalCount: number;
  private _schemas: PostSchema[];

  constructor(pageSize: number, totalCount: number, postSchemas: PostSchema[]) {
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
