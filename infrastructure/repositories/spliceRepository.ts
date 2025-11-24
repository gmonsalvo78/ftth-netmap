import { randomUUID } from 'crypto';
import { SplicePlan } from '../../core/entities/splicePlan';
import { SpliceRepositoryContract } from '../../core/contracts/spliceRepositoryContract';

const splices: (SplicePlan & { id: string })[] = [];

export class SpliceRepository implements SpliceRepositoryContract {
  async create(splice: SplicePlan): Promise<SplicePlan> {
    const record = { ...splice, id: splice.id ?? randomUUID() };
    splices.push(record);
    return record;
  }

  async list(): Promise<SplicePlan[]> {
    return splices;
  }

  async connectFiber(spliceId: string, fiberId: string, splitterId: string): Promise<SplicePlan> {
    const splice = splices.find((s) => s.id === spliceId);
    if (!splice) {
      throw new Error('Splice not found');
    }
    const fiber = splice.fibers.find((f) => f.id === fiberId);
    const splitter = splice.splitterLevels.find((s) => s.id === splitterId);
    if (fiber) {
      fiber.connectedTo = splitterId;
      fiber.status = 'used';
    }
    if (splitter) {
      splitter.connections.push({ output: splitter.connections.length + 1, fiberId });
    }
    return splice;
  }
}
