import { SplicePlan } from '../entities/splicePlan';

export interface SpliceRepositoryContract {
  create(splice: SplicePlan): Promise<SplicePlan>;
  list(): Promise<SplicePlan[]>;
  connectFiber(spliceId: string, fiberId: string, splitterId: string): Promise<SplicePlan>;
}
