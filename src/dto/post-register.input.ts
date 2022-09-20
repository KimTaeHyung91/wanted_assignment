import { Field, InputType } from '@nestjs/graphql';
import { PostEntity } from '../domain/post.entity';

@InputType()
export class PostRegisterInput {
  @Field({
    description: '제목',
  })
  private title: string;

  @Field({
    description: '내용',
  })
  private content: string;

  @Field({
    description: '작성자 이름',
  })
  private authorName: string;

  @Field({
    description: '비밀번호',
  })
  private password: string;

  toEntity() {
    return PostEntity.of(
      this.title,
      this.content,
      this.authorName,
      this.password,
    );
  }
}
