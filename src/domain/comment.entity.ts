import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('COMMENT')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column()
  authorName: string;

  @Column()
  createAt: string;

  /**연관관계 정의*/
  @ManyToOne(() => PostEntity, (ref) => ref.id, {})
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post: PostEntity;

  @ManyToOne(() => CommentEntity, (ref) => ref.subComment, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_comment_id', referencedColumnName: 'id' })
  parentComment: CommentEntity;

  @OneToMany(() => CommentEntity, (ref) => ref.parentComment)
  subComment: Promise<CommentEntity[]>;

  /**연관관계 메서드*/
  addPost(entity: PostEntity) {
    this.post = entity;
  }

  addParentComment(entity: CommentEntity) {
    this.parentComment = entity;
  }

  static of(content: string, authorName: string) {
    const entity = new CommentEntity();

    entity.content = content;
    entity.authorName = authorName;

    return entity;
  }
}
