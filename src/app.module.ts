import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import config from './config';
import { PostRepository } from './repository/post.repository';
import { PostEntity } from './domain/post.entity';
import { CommentEntity } from './domain/comment.entity';
import { CommentRepository } from './repository/comment.repository';
import { PostService } from './service/post.service';
import { CommentService } from './service/comment.service';
import { PostResovler } from './resovler/post.resovler';
import { CommentResovler } from './resovler/comment.resovler';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RegisterEventService } from './service/register-event.service';
import { KeywordRepository } from './repository/keyword.repository';
import { NotificationService } from './service/notification.service';

interface IMysqlConfig {
  mysql: IConnectionConfig;
}

interface IConnectionConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [config],
        }),
      ],
      useFactory: (configService: ConfigService) => {
        const db = configService.get<IMysqlConfig>('db');
        const { host, port, database, username, password } = db.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          entities: [PostEntity, CommentEntity],
          synchronize: false,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
  ],
  providers: [
    PostResovler,
    PostService,
    PostRepository,
    CommentResovler,
    CommentService,
    CommentRepository,
    KeywordRepository,
    RegisterEventService,
    NotificationService,
  ],
})
export class AppModule {
  constructor() {
    initializeTransactionalContext();
  }
}
