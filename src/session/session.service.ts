import { CacheService } from '@/src/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { Jwt } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { KEYOF_TOKEN } from '../common/environment';
import { User } from '@/src/user/user.entity';
import { UserService } from '@/src/user/user.service';
import constants from '@/src/common/constants';
import { createValidationError } from '@/src/common/createValidationError';

@Injectable()
export class SessionService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly cacheService: CacheService,
  ) {}
  // 生成Token
  genToken(user: User) {
    // 设置缓存
    this.setCacheUser(user);
    return {
      [KEYOF_TOKEN]: this.jwtService.sign(
        { email: user.email },
        { expiresIn: constants.TIME['1DAY'] },
      ),
    };
  }

  setCacheUser(user: any) {
    this.cacheService.set('SESSION_USER', user);
  }

  decodeToken(token: string): Jwt {
    return this.jwtService.decode(token) as any;
  }

  findUserByEmail(email: string, relations: string[] = []) {
    if (email) {
      try {
        return this.userService.findOneByEmail(email, relations);
      } catch (error) {
        return createValidationError({
          email: 'user not found',
        });
      }
    } else {
      return createValidationError({
        email: 'token exprired',
      });
    }
  }

  findUserByToken(token: string, relations: string[] = []) {
    const { email } = this.decodeToken(token);
    return this.findUserByEmail(email, relations);
  }
}
