export class Spending {
  constructor(
    private _id: number,
    private _date: Date,
    private _spendingCategory: string,
    private _spending: number,
    private _memo: string
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get date(): Date {
    return this._date;
  }

  public set date(date: Date) {
    this._date = date;
  }

  public get spendingCategory(): string {
    return this._spendingCategory;
  }

  public set spendingCategory(spendingCategory: string) {
    this._spendingCategory = spendingCategory;
  }

  public get spending(): number {
    return this._spending;
  }

  public set spending(spending: number) {
    this._spending = spending;
  }

  public get memo(): string {
    return this._memo;
  }

  public set memo(memo: string) {
    this._memo = memo;
  }
}
