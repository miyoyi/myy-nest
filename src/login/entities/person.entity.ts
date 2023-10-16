import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Generated,
  CreateDateColumn,
} from 'typeorm';
// import { Tags } from './tags.entity'

@Entity()
//Person类即为表名
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Generated('uuid') // 假设有一个随行自然增长的uuid
  uuid: string;

  @CreateDateColumn({ type: 'timestamp' }) // 定义一个类型用
  createTime: Date;

  // @OneToMany(() => Tags, (tags) => tags.user) // 这里不再写一个表了，这个标签代表的一对多，一为本表主体
  // tags:Tags[] // 这里tag就为多
}
