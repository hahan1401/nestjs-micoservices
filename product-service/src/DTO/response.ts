export class ResponseDTO<T = unknown> {
  constructor(
    private data: T,
    private total?: number,
  ) {}

  public getData(): T {
    return this.data;
  }
}
