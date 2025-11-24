import { SplicePlan } from '../../core/entities/splicePlan';
import { SpliceRepositoryContract } from '../../core/contracts/spliceRepositoryContract';

export class CreateSpliceUseCase {
  constructor(private readonly repo: SpliceRepositoryContract) {}

  async execute(input: Partial<SplicePlan>) {
    const plan = new SplicePlan({
      id: input.id,
      name: input.name ?? 'Nuevo empalme',
      cableId: input.cableId ?? '',
      splitterLevels: input.splitterLevels ?? [],
      fibers: input.fibers ?? [],
      autosaveSeconds: input.autosaveSeconds ?? 15
    });
    return this.repo.create(plan);
  }
}
