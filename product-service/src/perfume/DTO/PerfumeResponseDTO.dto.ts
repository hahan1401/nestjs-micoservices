export class PerufmeReponseDTO {
  public _id: string;
  public name: string;
  public description: string;
  public price: number;
  public categories: string[];
  public brand: string;
  public imageUrl: string;
  public collection: string;
  public createdAt?: string;
  public updatedAt?: string;
  public deletedAt?: string;
  public remaining?: number;
  public soldAmount?: number;

  constructor(perfumeDocument: PerufmeReponseDTO) {
    this._id = perfumeDocument._id;
    this.name = perfumeDocument.name;
    this.description = perfumeDocument.description;
    this.price = perfumeDocument.price;
    this.categories = perfumeDocument.categories;
    this.brand = perfumeDocument.brand;
    this.imageUrl = perfumeDocument.imageUrl;
    this.collection = perfumeDocument.collection;
    this.createdAt = perfumeDocument.createdAt;
    this.updatedAt = perfumeDocument.updatedAt;
    this.deletedAt = perfumeDocument.deletedAt;
    this.remaining = perfumeDocument.remaining;
    this.soldAmount = perfumeDocument.soldAmount;
  }
}
