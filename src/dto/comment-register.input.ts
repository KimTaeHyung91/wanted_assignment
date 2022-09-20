import { Field, InputType } from '@nestjs/graphql';
import { CommentEntity } from '../domain/comment.entity';

@InputType()
export class CommentRegisterInput {
  @Field()
  private content: string;

  @Field()
  private authorName: string;

  toEntity() {
    return CommentEntity.of(this.content, this.authorName);
  }
}
