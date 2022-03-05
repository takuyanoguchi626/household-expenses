export class Incoming {
  constructor(
    private _id: number,
    private _date: Date,
    private _incomingCategory: string,
    private _incoming: number,
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

  public get incomingCategory(): string {
    return this._incomingCategory;
  }

  public set incomingCategory(incomingCategory: string) {
    this._incomingCategory = incomingCategory;
  }

  public get incoming(): number {
    return this._incoming;
  }

  public set incoming(incoming: number) {
    this._incoming = incoming;
  }

  public get memo(): string {
    return this._memo;
  }

  public set memo(memo: string) {
    this._memo = memo;
  }
}
