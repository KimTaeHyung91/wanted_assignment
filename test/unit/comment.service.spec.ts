import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { CommentService } from '../../src/service/comment.service';
import { plainToInstance } from 'class-transformer';
import { CommentRegisterInput } from '../../src/dto/comment-register.input';
import { CommentRepository } from '../../src/repository/comment.repository';

describe('CommentService 테스트', () => {
  let repository: CommentRepository;
  let service: CommentService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<CommentService>(CommentService);
    repository = module.get<CommentRepository>(CommentRepository);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('게시글 댓글 등록 테스트', async () => {
    //given
    const postId = 1;
    const content = 'contents';
    const authorName = 'authorName';

    const input = plainToInstance(CommentRegisterInput, {
      content,
      authorName,
    });

    //when
    const commentServiceDto = await service.register(postId, input);

    //then
    expect(commentServiceDto.content).toEqual(content);
    expect(commentServiceDto.authorName).toEqual(authorName);
  });

  it('게시글 댓글의 댓글 등록 테스트', async () => {
    //given
    const postId = 1;
    const parent = 1;
    const content = 'contents';
    const authorName = 'authorName';

    const input = plainToInstance(CommentRegisterInput, {
      content,
      authorName,
    });

    //when
    const commentServiceDto = await service.registerSubComment(
      postId,
      parent,
      input,
    );

    //then
    expect(commentServiceDto.content).toEqual(content);
    expect(commentServiceDto.authorName).toEqual(authorName);
  });
});
