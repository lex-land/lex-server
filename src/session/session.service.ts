import CONSTANTS from '@/src/config/constants';
import { CacheService } from '@/src/cache/cache.service';
import { Injectable } from '@nestjs/common';
import { Jwt } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/src/user/user.entity';
import { UserService } from '@/src/user/user.service';
import { ValidatorError } from '@/src/helpers/validation/error';
import constants from '@/src/config/constants';

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
      [CONSTANTS.KEYOF_TOKEN]: this.jwtService.sign(
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
        return ValidatorError({
          email: 'user not found',
        });
      }
    } else {
      return ValidatorError({
        email: 'token exprired',
      });
    }
  }

  findUserByToken(token: string, relations: string[] = []) {
    const { email } = this.decodeToken(token);
    return this.findUserByEmail(email, relations);
  }
}
