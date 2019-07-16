import { Global, Module, CacheModule as NestCacheModule } from '@nestjs/common';
import { CacheService } from './cache.service';
import cache from '@/src/config/cache';

@Global()
@Module({
  imports: [
    // enable Redis
    // https://docs.nestjs.com/techniques/caching#different-stores
    NestCacheModule.register(cache),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
