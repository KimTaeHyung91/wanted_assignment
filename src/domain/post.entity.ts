import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EncryptUtil } from '../common/encrypt-util';
import { CommentEntity } from './comment.entity';

@Entity('POST')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  authorName: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updateAt: Date;

  /**연관관계 정의*/
  @OneToMany(() => CommentEntity, (ref) => ref.post)
  comments: Promise<CommentEntity[]>;

  static of(
    title: string,
    content: string,
    authorName: string,
    password: string,
  ) {
    const salt = EncryptUtil.createSalt();
    const entity = new PostEntity();
    entity.title = title;
    entity.content = content;
    entity.authorName = authorName;
    entity.password = EncryptUtil.encryptPw(password, salt);
    entity.salt = salt;

    return entity;
  }

  static modifyOf(title: string, content: string) {
    const entity = new PostEntity();

    if (title) {
      entity.title = title;
    }

    if (content) {
      entity.content = content;
    }

    return entity;
  }
}
