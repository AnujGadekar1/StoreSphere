// Path: src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { StoresModule } from './modules/stores/stores.module';
import { RatingsModule } from './modules/ratings/ratings.module';

import { User } from './modules/users/entities/user.entity';
import { Store } from './modules/stores/entities/store.entity';
import { Rating } from './modules/ratings/entities/rating.entity';

@Module({
  imports: [
    // 🌍 Global .env access
    ConfigModule.forRoot({ isGlobal: true }),

    // 🗄️ Database connection
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Store, Rating],
      synchronize: true, // ⚠️ disable in production
    }),

    // 📦 Feature modules
    AuthModule,
    UsersModule,   // ✅ AdminController is wired here
    StoresModule,
    RatingsModule,
  ],
})
export class AppModule {}
