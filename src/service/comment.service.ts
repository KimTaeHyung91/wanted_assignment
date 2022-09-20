import { Injectable } from '@nestjs/common';
import { CommentRegisterInput } from '../dto/comment-register.input';
import { CommentRepository } from '../repository/comment.repository';
import { PostRepository } from '../repository/post.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { PageRequestArgs } from '../dto/page-request.args';
import { CommentServiceDto } from '../dto/comment-service.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async searchComments(
    postId: number,
    pageArgs: PageRequestArgs,
    parentCommentId?: number,
  ): Promise<[CommentServiceDto[], number]> {
    const [result, totalCount] = await this.commentRepository.findAll(
      postId,
      pageArgs,
      parentCommentId,
    );
    return [result.map((item) => CommentServiceDto.of(item)), totalCount];
  }

  @Transactional()
  async register(
    postId: number,
    input: CommentRegisterInput,
  ): Promise<CommentServiceDto> {
    const postEntity = await this.postRepository.findOneBy(postId);
    const commentEntity = input.toEntity();
    commentEntity.addPost(postEntity);
    const entity = await this.commentRepository.save(commentEntity);

    return CommentServiceDto.of(entity);
  }

  @Transactional()
  async registerSubComment(
    postId: number,
    parentCommentId: number,
    input: CommentRegisterInput,
  ): Promise<CommentServiceDto> {
    const postEntity = await this.postRepository.findOneBy(postId);
    const parent = await this.commentRepository.findOneBy(parentCommentId);
    const child = input.toEntity();
    child.addPost(postEntity);
    child.addParentComment(parent);
    const entity = await this.commentRepository.save(child);

    return CommentServiceDto.of(entity);
  }
}
