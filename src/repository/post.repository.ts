import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { PostEntity } from '../domain/post.entity';
import { PageRequestArgs } from '../dto/page-request.args';
import { PostSearchInput } from '../dto/post-search.input';

@Injectable()
export class PostRepository {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
  ) {}

  async findOneBy(id: number): Promise<PostEntity> {
    return await this.em.findOne(PostEntity, id).catch(() => null);
  }

  async findAllBy(
    pageArgs: PageRequestArgs,
    input: PostSearchInput,
  ): Promise<[PostEntity[], number]> {
    const queryBuilder = this.em
      .createQueryBuilder(PostEntity, 'post')
      .limit(pageArgs.getLimit())
      .offset(pageArgs.getOffset())
      .orderBy('id', 'DESC');

    if (input && input.hasTitle()) {
      queryBuilder.andWhere('post.title LIKE :title', {
        title: `%${input.getTitle()}%`,
      });
    }

    if (input && input.hasAuthorName()) {
      queryBuilder.andWhere('post.authorName LIKE :authorName', {
        authorName: `%${input.getAuthorName()}%`,
      });
    }

    return await queryBuilder.getManyAndCount();
  }

  async save(entity: PostEntity): Promise<PostEntity> {
    return await this.em.save(entity);
  }

  async update(id: number, entity: PostEntity): Promise<void> {
    await this.em.update(PostEntity, id, entity);
  }

  async delete(id: number): Promise<void> {
    await this.em.delete(PostEntity, id);
  }
}
