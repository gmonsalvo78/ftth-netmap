export type CableCapacity = { buffers: number; fibers: number };
export type ColorCode = { buffer: string; fiber: string; position: number };

export class Cable {
  code: string;
  length: number;
  type: string;
  capacity: CableCapacity;
  colorPattern: ColorCode[];
  spliceBoxIds: string[];

  constructor(params: {
    code: string;
    length: number;
    type: string;
    capacity: CableCapacity;
    colorPattern: ColorCode[];
    spliceBoxIds: string[];
  }) {
    this.code = params.code;
    this.length = params.length;
    this.type = params.type;
    this.capacity = params.capacity;
    this.colorPattern = params.colorPattern;
    this.spliceBoxIds = params.spliceBoxIds;
  }
}
