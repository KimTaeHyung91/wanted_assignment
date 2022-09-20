import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('KEYWORD')
export class KeywordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorName: string;

  @Column()
  keyword: string;

  contain(value: string) {
    return value.includes(this.keyword);
  }
}
