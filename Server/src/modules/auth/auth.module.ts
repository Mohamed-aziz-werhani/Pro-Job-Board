import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
   HttpModule,
   PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // à remplacer par une clé secrète plus forte
      signOptions: { expiresIn: '60m' }, // Le jeton expire après 60 minutes
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule { }