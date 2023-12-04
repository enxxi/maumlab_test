import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, Logger } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SurveyModule } from './apis/survey/survey.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionModule } from './apis/question/question.module';
import { OptionModule } from './apis/option/option.module';
import { ResponseModule } from './apis/response/response.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      cache: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await typeORMConfig(configService),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/utils/graphql/schema.gql',
    }),
    SurveyModule,
    QuestionModule,
    // OptionModule,
    // ResponseModule,
  ],
})
export class AppModule {}
