import { PostEntity } from '../domain/post.entity';

export class PostServiceDto {
  private _id: number;
  private _title: string;
  private _content: string;
  private _authorName: string;
  private _password: string;
  private _createAt: Date;
  private _updateAt: Date;

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get authorName(): string {
    return this._authorName;
  }

  get password(): string {
    return this._password;
  }

  get createAt(): Date {
    return this._createAt;
  }

  get updateAt(): Date {
    return this._updateAt;
  }

  static of(entity: PostEntity) {
    const dto = new PostServiceDto();
    dto._id = entity.id;
    dto._title = entity.title;
    dto._content = entity.content;
    dto._authorName = entity.authorName;
    dto._password = entity.password;
    dto._createAt = entity.createAt;
    dto._updateAt = entity.updateAt;

    return dto;
  }
}
