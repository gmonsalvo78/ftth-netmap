import { InfrastructureRepositoryContract } from '../../core/contracts/infrastructureRepositoryContract';
import { randomUUID } from 'crypto';

const nodes: any[] = [];

export class InfrastructureRepository implements InfrastructureRepositoryContract {
  async listNodes(): Promise<any[]> {
    return nodes;
  }

  async createNode(node: any): Promise<any> {
    const stored = { id: randomUUID(), ...node };
    nodes.push(stored);
    return stored;
  }

  async exportKml(): Promise<string> {
    const placemarks = nodes
      .map((n) => `<Placemark><name>${n.name ?? 'Nodo'}</name><Point><coordinates>${n.lng},${n.lat}</coordinates></Point></Placemark>`) // eslint-disable-line max-len
      .join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?><kml><Document>${placemarks}</Document></kml>`;
  }
}
