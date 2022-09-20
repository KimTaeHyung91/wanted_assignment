import { KeywordEntity } from '../domain/keyword.entity';

export class RegisterEvent {
  private _authorName: string;
  private _title: string;
  private _content: string;

  constructor(authorName: string, title?: string, content?: string) {
    this._authorName = authorName;
    this._title = title;
    this._content = content;
  }

  get authorName(): string {
    return this._authorName;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  isSend(entities: KeywordEntity[]) {
    for (const entity of entities) {
      if (this._title && this._content) {
        return entity.contain(this._title) && entity.contain(this._content);
      }
      if (this._title) {
        return entity.contain(this._title);
      }

      if (this._content) {
        return entity.contain(this._content);
      }
    }
  }
}
