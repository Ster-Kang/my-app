import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nModule, QueryResolver, HeaderResolver } from 'nestjs-i18n';
import { join } from 'path';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'ko',
      loaderOptions: { path: join(__dirname, 'i18n'), watch: false },
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // ?lang=ko|en
        HeaderResolver,                             // Accept-Language
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
