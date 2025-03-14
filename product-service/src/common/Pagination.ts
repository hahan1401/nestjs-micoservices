export class Pagination {
  public pageSize: number;
  public pageIndex: number;
  constructor(pageSize: number, pageIndex: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}
