import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TranslationsModule } from './translations/translations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'translation',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ProjectsModule,
    TranslationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
