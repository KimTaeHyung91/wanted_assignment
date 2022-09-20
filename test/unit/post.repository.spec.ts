import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { PostRepository } from '../../src/repository/post.repository';
import { PostEntity } from '../../src/domain/post.entity';
import { EncryptUtil } from '../../src/common/encrypt-util';
import { plainToInstance } from 'class-transformer';
import { PageRequestArgs } from '../../src/dto/page-request.args';
import { PostSearchInput } from '../../src/dto/post-search.input';

describe('CommentService DB 커넥션 테스트', () => {
  let repository: PostRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    repository = module.get<PostRepository>(PostRepository);
  });

  it('should be defined', async () => {
    expect(repository).toBeDefined();
  });

  it('기본 페이지네이션 테스트', async () => {
    //given
    const pageSize = 20;
    const pageNo = 1;

    const args = plainToInstance(PageRequestArgs, {
      pageSize,
      pageNo,
    });

    //when
    const [result, totalCount] = await repository.findAllBy(args, null);

    //then
    expect(result[0]).toBeInstanceOf(PostEntity);
    expect(totalCount).toEqual(30);
  });

  it('검색조건(authorName) 페이지네이션 테스트', async () => {
    //given
    const pageSize = 20;
    const pageNo = 1;
    const authorName = 'authorName1';

    const args = plainToInstance(PageRequestArgs, {
      pageSize,
      pageNo,
    });

    const input = plainToInstance(PostSearchInput, {
      authorName,
    });

    //when
    const [result, totalCount] = await repository.findAllBy(args, input);

    //then
    expect(result[0]).toBeInstanceOf(PostEntity);
    expect(totalCount).toEqual(2);
  });

  it('검색조건(title) 페이지네이션 테스트', async () => {
    //given
    const pageSize = 20;
    const pageNo = 1;
    const title = 'title1';

    const args = plainToInstance(PageRequestArgs, {
      pageSize,
      pageNo,
    });

    const input = plainToInstance(PostSearchInput, {
      title,
    });

    //when
    const [result, totalCount] = await repository.findAllBy(args, input);

    //then
    expect(result[0]).toBeInstanceOf(PostEntity);
    expect(totalCount).toEqual(1);
  });

  it('게시글 등록 테스트', async () => {
    //given
    const title = 'title';
    const content = 'contents';
    const authorName = 'authorName';
    const password = '1234';

    //when
    await repository.save(PostEntity.of(title, content, authorName, password));

    //then
    const result = await repository.findOneBy(1);
    expect(result.title).toEqual(title);
    expect(result.content).toEqual(content);
    expect(result.authorName).toEqual(authorName);
    expect(result.password).toEqual(
      EncryptUtil.encryptPw(password, result.salt),
    );
  });

  it('게시글 조회 테스트', async () => {
    //given
    const id = 1;

    //when
    const result = await repository.findOneBy(id);

    //then
    expect(result.id).toEqual(id);
  });

  it('게시글 조회 스네이크 케이스 테스트', async () => {
    //given
    const id = 1;
    const authorName = 'authorName';

    //when
    const result = await repository.findOneBy(id);

    //then
    expect(result.authorName).toEqual(authorName);
  });
});
