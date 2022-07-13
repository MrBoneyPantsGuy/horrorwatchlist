/**
 * this model specifies the format to exchange a user with the backend
 */
export class User{
  constructor(
    // tslint:disable-next-line:variable-name
    public _id: string,
    public username: string,
    public email: string,
    public isAdmin: boolean,
    public crowns: number
  ) {  }
}
