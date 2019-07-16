import { Body, Controller, Post } from '@nestjs/common';
import { CacheService } from '@/src/cache/cache.service';
import { InterfaceService } from '@/src/interface/interface.service';
import { MigrateRepoDto } from './dto/migrate-repo.dto';
import { ModuleService } from '@/src/module/module.service';
import { OrganizationService } from '@/src/organization/organization.service';
import { PropertyService } from '@/src/property/property.service';
import { RepositoryService } from '@/src/repository/repository.service';
import { User } from '@/src/user/user.entity';
import { UserService } from '@/src/user/user.service';
import md5 from 'md5';

@Controller('migration')
export class MigrationController {
  constructor(
    private readonly userService: UserService,
    private readonly orgService: OrganizationService,
    private readonly repoService: RepositoryService,
    private readonly modService: ModuleService,
    private readonly inteService: InterfaceService,
    private readonly propService: PropertyService,
    private readonly cacheService: CacheService,
  ) {}
  @Post('repo')
  public async migrateRepo(@Body('data') repoJson: MigrateRepoDto) {
    const sessionUser = await this.cacheService.get('SESSION_USER');
    const repo = await this.repoService.create({
      name: repoJson.name,
      description: repoJson.description,
      creator: sessionUser,
      owner: sessionUser,
    });
    for (const repoMod of repoJson.modules) {
      const mod = await this.modService.create({
        name: repoMod.name,
        description: repoMod.description,
        repository: repo,
      });
      for (const modInte of repoMod.interfaces) {
        const inte = await this.inteService.create({
          method: modInte.method,
          url: modInte.url,
          name: modInte.name,
          description: modInte.description,
          repository: repo,
          module: mod,
        });
        await this.propService.createSome(modInte.properties, {
          repository: repo,
          module: mod,
          interface: inte,
        });
      }
    }
    return repo;
  }

  @Post('org')
  public async migrateOrgs(@Body('data') orgJson: any) {
    const userObject: any = {};
    for (const { members } of orgJson) {
      for (const user of members) {
        userObject[user.email] = await this.userService.findOneByEmail(
          user.email,
        );
      }
    }
    for (const org of orgJson) {
      if (!(await this.orgService.findOneByName(org.name))) {
        this.orgService.create({
          name: org.name,
          description: org.description,
          creator: userObject[org.creator.email],
          owner: userObject[org.owner.email],
          members: org.members.map((m: any) => userObject[m.email]),
        });
      }
    }
    return {};
  }

  @Post('user')
  public async migrateUser(@Body('data') orgJson: any) {
    const userObject: { [key: string]: User } = {};
    for (const { members } of orgJson) {
      for (const user of members) {
        userObject[user.email] = user;
      }
    }
    for (const user of Object.values(userObject)) {
      if (!(await this.userService.isExist(user.email))) {
        userObject[user.email] = await this.userService.create({
          fullname: user.fullname,
          email: user.email,
          password: md5('sunmi388'),
        });
      }
    }
    return userObject;
  }
}
