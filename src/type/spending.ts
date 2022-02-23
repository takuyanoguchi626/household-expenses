export class Spending {
  constructor(
    private _date: string,
    private _category: string,
    private _spending: number
  ) {}

  public get date(): string {
    return this._date;
  }

  public set date(date: string) {
    this._date = date;
  }

  public get category(): string {
    return this._category;
  }

  public set category(category: string) {
    this._category = category;
  }

  public get spending(): number {
    return this._spending;
  }

  public set spending(spending: number) {
    this._spending = spending;
  }
}
