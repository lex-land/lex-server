import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { SessionService } from './session.service';
import { Token } from '@/src/common/token.decorator';
import { UserService } from '@/src/user/user.service';
import { createValidationError } from '@/src/common/createValidationError';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}
  @Post()
  public async login(@Body() loginDto: LoginDto) {
    if (await this.userService.isExist(loginDto.username)) {
      try {
        const session = await this.userService.findOneByLoginDto(loginDto);
        return this.sessionService.genToken(session);
      } catch (error) {
        // 密码错误
        return createValidationError({
          password: 'password is not correct',
        });
      }
    } else {
      // 用户不存在
      return createValidationError({
        username: 'username is not exist',
      });
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  public async sessionUser(@Token() token: string) {
    return this.sessionService.findUserByToken(token, [
      'ownedOrganizations',
      'joinedOrganizations',
      'ownedRepositories',
      'joinedRepositories',
    ]);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async session(@Token() token: string) {
    const session = await this.sessionService.findUserByToken(token);
    this.sessionService.setCacheUser(session);
    return session;
  }
}
