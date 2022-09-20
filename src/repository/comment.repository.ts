import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CommentEntity } from '../domain/comment.entity';
import { PageRequestArgs } from '../dto/page-request.args';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
  ) {}

  async findOneBy(commentId: number): Promise<CommentEntity> {
    return await this.em.findOne(CommentEntity, commentId).catch(() => null);
  }

  async findAll(
    postId: number,
    pageArgs: PageRequestArgs,
    parentCommentId?: number,
  ): Promise<[CommentEntity[], number]> {
    const queryBuilder = this.em
      .createQueryBuilder(CommentEntity, 'comment')
      .where('comment.postId = :postId', { postId })
      .limit(pageArgs.getLimit())
      .offset(pageArgs.getOffset())
      .orderBy('id', 'DESC');

    if (parentCommentId) {
      queryBuilder.andWhere('comment.parentCommentId = :parentCommentId', {
        parentCommentId,
      });
    }
    return await queryBuilder.getManyAndCount();
  }

  async save(entity: CommentEntity): Promise<CommentEntity> {
    return await this.em.save(entity);
  }
}
