import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InternalServerErrorException, ParseIntPipe } from '@nestjs/common';
import { CommentRegisterInput } from '../dto/comment-register.input';
import { CommentPageSchema, CommentSchema } from '../schema/comment.schema';
import { CommentService } from '../service/comment.service';
import { PageRequestArgs } from '../dto/page-request.args';
import { PageSchema } from '../schema/page.schema';
import { PostSchema } from '../schema/post.schema';

@Resolver(CommentSchema)
export class CommentResovler {
  constructor(private readonly commentService: CommentService) {}

  @ResolveField(() => CommentPageSchema)
  async comments(
    @Parent() post: PostSchema,
    @Args() pageArgs: PageRequestArgs,
  ): Promise<CommentPageSchema> {
    try {
      const [result, totalCount] = await this.commentService.searchComments(
        +post.id,
        pageArgs,
      );

      const commentPageSchema = new CommentPageSchema(
        pageArgs.getLimit(),
        totalCount,
        result.map((item) => CommentSchema.of(item)),
      ).pagination();

      return commentPageSchema.pagination();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @ResolveField(() => CommentPageSchema)
  async subComments(
    @Parent() post: PostSchema,
    @Parent() parent: CommentSchema,
    @Args() pageArgs: PageRequestArgs,
  ): Promise<CommentPageSchema> {
    try {
      const [result, totalCount] = await this.commentService.searchComments(
        +post.id,
        pageArgs,
        +parent.id,
      );

      const commentPageSchema = new CommentPageSchema(
        pageArgs.getLimit(),
        totalCount,
        result.map((item) => CommentSchema.of(item)),
      ).pagination();

      return commentPageSchema.pagination();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Mutation(() => Boolean, {
    description: '댓글 등록',
  })
  async registerComment(
    @Args('postId', new ParseIntPipe()) postId: number,
    input: CommentRegisterInput,
  ): Promise<boolean> {
    try {
      await this.commentService.register(postId, input);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Mutation(() => Boolean, {
    description: '댓글의 댓글 등록',
  })
  async registerSubComment(
    @Args('postId', new ParseIntPipe()) postId: number,
    @Args('parentCommentId', new ParseIntPipe()) parentCommentId: number,
    input: CommentRegisterInput,
  ) {
    try {
      await this.commentService.registerSubComment(
        postId,
        parentCommentId,
        input,
      );
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
