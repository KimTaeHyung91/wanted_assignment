import { Field, InputType } from '@nestjs/graphql';
import { PostEntity } from '../domain/post.entity';

@InputType()
export class PostModifyInput {
  @Field({
    nullable: true,
    description: '제목',
  })
  private title?: string;

  @Field({
    nullable: true,
    description: '내용',
  })
  private content?: string;

  @Field()
  private password: string;

  getPassword() {
    return this.password;
  }

  toEntity() {
    return PostEntity.modifyOf(this.title, this.content);
  }
}
