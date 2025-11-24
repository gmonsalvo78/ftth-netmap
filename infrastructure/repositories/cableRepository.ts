import { Cable } from '../../core/entities/cable';
import { CableRepositoryContract } from '../../core/contracts/cableRepositoryContract';
import { randomUUID } from 'crypto';

const cables: (Cable & { id: string })[] = [];

export class CableRepository implements CableRepositoryContract {
  async create(cable: Cable): Promise<Cable> {
    const record = { ...cable, id: randomUUID() };
    cables.push(record);
    return record;
  }

  async list(): Promise<Cable[]> {
    return cables;
  }
}
