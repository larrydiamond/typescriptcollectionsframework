import {Comparator} from "./Comparator";

export class CollectionUtils {
  public static getStringComparator():Comparator<string> {
    let sortString:Comparator<string> = {
      compare(o1:string, o2:string) : number {
        if (o1 === o2)
          return 0;
        if (o1 === null)
          return -1;
        if (o1 === undefined)
          return -1;
        if (o2 === null)
          return 1;
        if (o2 === undefined)
          return 1;
        if (o1 < o2)
          return -1;

        return 1;
      }
    }

    return sortString;
  }

  public static getNumberComparator():Comparator<number> {
    let sortNumber:Comparator<number> = {
      compare(o1:number, o2:number) : number {
        if (o1 === o2)
          return 0;
        if (o1 === null)
          return -1;
        if (o1 === undefined)
          return -1;
        if (o2 === null)
          return 1;
        if (o2 === undefined)
          return 1;
        if (o1 < o2)
          return -1;

        return 1;
      }
    }
    return sortNumber;
  }

}
