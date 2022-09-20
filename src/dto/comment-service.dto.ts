import { CommentEntity } from '../domain/comment.entity';

export class CommentServiceDto {
  private _id: string;
  private _content: string;
  private _authorName: string;

  get id(): string {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get authorName(): string {
    return this._authorName;
  }

  static of(entity: CommentEntity) {
    const dto = new CommentServiceDto();
    dto._id = entity.id + '';
    dto._content = entity.content;
    dto._authorName = entity.authorName;

    return dto;
  }
}
