/**
 * this model specifies the format to exchange credentials with the backend
 */


export class NamedCrown {
  constructor(
    // tslint:disable-next-line:variable-name
    public _id: string,
    public userID: string,
    public type: string,
    public date: string,
    public context: string,
    public line: string,
    public url: string
  ) {  }
}
