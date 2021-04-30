import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserManagementModule } from "./user-management/user-management.module";
import { ProjectsModule } from "./projects/projects.module";
import { TranslationsModule } from "./translations/translations.module";
import { ImportExportModule } from './import-export/import-export.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserManagementModule,
    ProjectsModule,
    TranslationsModule,
    ImportExportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
