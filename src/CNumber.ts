export class CNumber implements Collectable {
  num:number;
  constructor (inum:number) {
    this.num = inum;
  }

  equals (t:any) : boolean {
    if (this.num === t)
      return true;
    return false;
  }

  get () : number {
    return this.num;
  }
}
