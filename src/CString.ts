export class CString implements Collectable {
  str:string;
  constructor (istr:string) {
    this.str = istr;
  }

  equals (t:any) : boolean {
    if (this.str === t)
      return true;
    return false;
  }

  get () : string {
    return this.str;
  }
}
