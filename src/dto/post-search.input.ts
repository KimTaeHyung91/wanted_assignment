import { Field, InputType } from '@nestjs/graphql';
import { ValidUtil } from '../common/valid-util';

@InputType()
export class PostSearchInput {
  @Field({
    nullable: true,
  })
  private title?: string;

  @Field({
    nullable: true,
  })
  private authorName?: string;

  getTitle() {
    return this.title;
  }

  getAuthorName() {
    return this.authorName;
  }

  hasTitle() {
    return !ValidUtil.isNull(this.title);
  }

  hasAuthorName() {
    return !ValidUtil.isNull(this.authorName);
  }
}
