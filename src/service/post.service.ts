import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { PostRegisterInput } from '../dto/post-register.input';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { PostServiceDto } from '../dto/post-service.dto';
import { PostModifyInput } from '../dto/post-modify.input';
import { PageRequestArgs } from '../dto/page-request.args';
import { PostSearchInput } from '../dto/post-search.input';
import { PostPolicy } from '../policy/post-policy';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RegisterEvent } from '../event/register-event';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async searchPost(id: number) {
    const entity = await this.postRepository.findOneBy(id);
    return PostServiceDto.of(entity);
  }

  async searchPosts(
    pageArgs: PageRequestArgs,
    input: PostSearchInput,
  ): Promise<[PostServiceDto[], number]> {
    const [posts, count] = await this.postRepository.findAllBy(pageArgs, input);
    return [posts.map((item) => PostServiceDto.of(item)), count];
  }

  @Transactional()
  async register(input: PostRegisterInput): Promise<PostServiceDto> {
    const entity = await this.postRepository.save(input.toEntity());
    if (entity) {
      this.eventEmitter.emit(
        'register.post',
        new RegisterEvent(entity.authorName, entity.title, entity.content),
      );
    }
    return PostServiceDto.of(entity);
  }

  @Transactional()
  async modify(id: number, input: PostModifyInput): Promise<void> {
    const entity = await this.postRepository.findOneBy(id);
    const postPolicy = new PostPolicy();
    postPolicy.password = entity.password;
    postPolicy.checkPassword(input.getPassword(), entity.salt);

    await this.postRepository.update(id, input.toEntity());
  }

  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
