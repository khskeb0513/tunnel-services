import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { join } from 'path';
import { IndexController } from './index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NgrokHttpModule } from './ngrok/ngrok-http.module';
import { Logger } from './logger/entity/logger.entity';
import { NgrokTunnel } from './ngrok/entity/ngrok-tunnel.entity';
import { NgrokConfig } from './ngrok/entity/ngrok-config.entity';
import { LoggerHttpModule } from './logger/logger-http.module';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: true,
        dir: join(__dirname, '..', '..', 'ui/'),
      }),
      { viewsDir: '' },
    ),
    TypeOrmModule.forRoot({
      database: join(__dirname, '..', 'db', 'tunnel-services.db'),
      synchronize: true,
      entities: [Logger, NgrokTunnel, NgrokConfig],
      type: 'better-sqlite3',
    }),
    NgrokHttpModule,
    LoggerHttpModule,
  ],
  controllers: [IndexController],
})
export class AppModule {}
