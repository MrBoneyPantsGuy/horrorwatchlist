/**
 * this model specifies the format to exchange a user with the backend
 */
export class User{
  constructor(
    public username: string,
    public email: string,
    public isAdmin: boolean
  ) {  }
}
