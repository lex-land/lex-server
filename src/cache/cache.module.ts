import { Global, Module, CacheModule as NestCacheModule } from '@nestjs/common';
import { CacheService } from './cache.service';
import constants from '../common/constants';

@Global()
@Module({
  imports: [
    // enable Redis
    // https://docs.nestjs.com/techniques/caching#different-stores
    NestCacheModule.register({
      ttl: constants.TIME['1DAY'], // 1 day
      max: 50000, // maximum number of items in cache
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
