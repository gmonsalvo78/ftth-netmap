export type FiberCore = {
  id: string;
  code: string;
  buffer: string;
  color: string;
  status: 'free' | 'reserved' | 'used';
  connectedTo?: string;
};

export type Splitter = {
  id: string;
  code: string;
  level: number;
  ratio: string;
  outputs: number;
  connections: { output: number; fiberId?: string }[];
};

export class SplicePlan {
  id?: string;
  name: string;
  cableId: string;
  splitterLevels: Splitter[];
  fibers: FiberCore[];
  autosaveSeconds: number;

  constructor(params: {
    id?: string;
    name: string;
    cableId: string;
    splitterLevels: Splitter[];
    fibers: FiberCore[];
    autosaveSeconds: number;
  }) {
    this.id = params.id;
    this.name = params.name;
    this.cableId = params.cableId;
    this.splitterLevels = params.splitterLevels;
    this.fibers = params.fibers;
    this.autosaveSeconds = params.autosaveSeconds;
  }
}
