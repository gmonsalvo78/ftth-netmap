import { Cable } from '../entities/cable';

export interface CableRepositoryContract {
  create(cable: Cable): Promise<Cable>;
  list(): Promise<Cable[]>;
}
