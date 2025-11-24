export interface InfrastructureRepositoryContract {
  listNodes(): Promise<any[]>;
  createNode(node: any): Promise<any>;
  exportKml(): Promise<string>;
}
