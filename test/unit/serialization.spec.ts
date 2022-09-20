import { plainToInstance } from 'class-transformer';
import { CommentRegisterInput } from '../../src/dto/comment-register.input';
import { CommentEntity } from '../../src/domain/comment.entity';

describe('직렬화 테스트', () => {
  it('요청 DTO 테스트', async () => {
    //given
    const content = 'contents';
    const authorName = 'authorName';

    //when
    const commentRegisterInput = plainToInstance(CommentRegisterInput, {
      content,
      authorName,
    });

    //then
    expect(commentRegisterInput).toBeInstanceOf(CommentRegisterInput);
    expect(commentRegisterInput.toEntity()).toBeInstanceOf(CommentEntity);
    expect(commentRegisterInput).toMatchObject({
      content,
      authorName,
    });
  });
});
