export class PerufmeReponseDTO {
  private _id: string;
  private name: string;
  private description: string;
  private price: number;
  private category: string;
  private brand: string;
  private createdDate?: string;
  private modifiedDate?: string;
  private deletedDate?: string;

  constructor(perfumeDocument: PerufmeReponseDTO) {
    this._id = perfumeDocument._id;
    this.name = perfumeDocument.name;
    this.description = perfumeDocument.description;
    this.price = perfumeDocument.price;
    this.category = perfumeDocument.category;
    this.brand = perfumeDocument.brand;
    this.createdDate = perfumeDocument.createdDate;
    this.modifiedDate = perfumeDocument.modifiedDate;
    this.deletedDate = perfumeDocument.deletedDate;
  }

  public toObject() {
    return {
      _id: this._id,
      name: this.name,
      description: this.description,
      price: this.price,
      category: this.category,
      brand: this.brand,
      createdDate: this.createdDate,
      modifiedDate: this.modifiedDate,
      deletedDate: this.deletedDate,
    };
  }
}
