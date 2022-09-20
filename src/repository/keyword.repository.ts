import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { KeywordEntity } from '../domain/keyword.entity';

@Injectable()
export class KeywordRepository {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
  ) {}

  async findAllBy(authorName: string): Promise<KeywordEntity[]> {
    return await this.em
      .createQueryBuilder(KeywordEntity, 'keyword')
      .where('keyword.authorName LIKE :authorName', {
        authorName: `%${authorName}%`,
      })
      .getMany();
  }
}
