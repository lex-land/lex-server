import { Interface } from '@/src/interface/interface.entity';
import { Property } from '@/src/property/property.entity';
import { Repository } from '../repository.entity';

export interface RepositoryQuery extends Repository {
  interfaces: Interface[];
  properties: Property[];
}

export interface RepositorysQuery {
  repositorys: Repository[];
}
