import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostPageSchema, PostSchema } from '../schema/post.schema';
import { PostService } from '../service/post.service';
import { PostRegisterInput } from '../dto/post-register.input';
import { InternalServerErrorException, ParseIntPipe } from '@nestjs/common';
import { PageRequestArgs } from '../dto/page-request.args';
import { PostModifyInput } from '../dto/post-modify.input';
import { PostSearchInput } from '../dto/post-search.input';

@Resolver(PostSchema)
export class PostResovler {
  constructor(private readonly postService: PostService) {}

  @Query(() => PostSchema, {
    description: '게시글 조회',
  })
  async post(@Args('id', new ParseIntPipe()) id: number): Promise<PostSchema> {
    try {
      const result = await this.postService.searchPost(id);
      return PostSchema.of(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Query(() => PostPageSchema, {
    description: '게시글 목록 조회',
  })
  async posts(
    @Args() pageArgs: PageRequestArgs,
    @Args('input') input: PostSearchInput = null,
  ): Promise<PostPageSchema> {
    const [result, totalCount] = await this.postService.searchPosts(
      pageArgs,
      input,
    );

    const postPageSchema = new PostPageSchema(
      pageArgs.getLimit(),
      totalCount,
      result.map((item) => PostSchema.of(item)),
    );
    return postPageSchema.pagination();
  }

  @Mutation(() => PostSchema, {
    description: '게시글 등록',
  })
  async registerPost(input: PostRegisterInput) {
    try {
      const result = await this.postService.register(input);
      return PostSchema.of(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Mutation(() => Boolean, {
    description: '게시글 수정',
  })
  async modify(
    @Args('id', new ParseIntPipe()) id: number,
    input: PostModifyInput,
  ): Promise<boolean> {
    try {
      await this.postService.modify(id, input);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Mutation(() => Boolean, {
    description: '게시글 삭제',
  })
  async remove(@Args('id', new ParseIntPipe()) id: number) {
    try {
      await this.postService.remove(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
