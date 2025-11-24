import { Cable } from '../../core/entities/cable';
import { CableRepositoryContract } from '../../core/contracts/cableRepositoryContract';

export class CreateCableUseCase {
  constructor(private readonly repo: CableRepositoryContract) {}

  async execute(input: Partial<Cable>) {
    const cable = new Cable({
      code: input.code ?? 'UNASSIGNED',
      length: input.length ?? 0,
      type: input.type ?? 'ADSS',
      capacity: input.capacity ?? { buffers: 1, fibers: 12 },
      colorPattern: input.colorPattern ?? [],
      spliceBoxIds: input.spliceBoxIds ?? []
    });
    return this.repo.create(cable);
  }
}
