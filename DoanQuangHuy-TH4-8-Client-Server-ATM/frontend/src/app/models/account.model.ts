export class Account {
  _id: string;
  _email: string;
  _password: string;
  _money: number;

  constructor(id: string, email: string, password: string, money: number) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._money = money;
  }
}
