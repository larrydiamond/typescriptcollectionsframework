import {ArrayList} from "../src/ArrayList";
import {Collectable} from "../src/Collectable";
import {Collection} from "../src/Collection";
import {List} from "../src/List";

describe("Test ArrayList functionality", function() {
  // This class does nothing I just need to have a class in the test list
  class PetStoreProduct implements Collectable {
    public productName:string;
    public price:number;

    constructor (iName:string, iPrice:number) {
      this.productName = iName;
      this.price = iPrice;
    }

    equals (t:any) : boolean {
      if (JSON.stringify(this) === JSON.stringify(t))
        return true;
      return false;
    };
  };

  it("Test Creation state", function() {
    let list:List<PetStoreProduct> = new ArrayList<PetStoreProduct> ();
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);

    let collection:Collection<PetStoreProduct> = list;
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);
  });

  it("Test Adding some items", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();
    let list:List<PetStoreProduct> = arraylist;
    let collection:Collection<PetStoreProduct> = list;

    let product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
    let product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);

    arraylist.add (product1);
    arraylist.add (product2);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);
  });

  it("Test clearing the ArrayList", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();
    let list:List<PetStoreProduct> = arraylist;
    let collection:Collection<PetStoreProduct> = list;

    let product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
    let product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);

    arraylist.add (product1);
    arraylist.add (product2);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);

    arraylist.clear();

    expect (arraylist.isEmpty ()).toEqual(true);
    expect (arraylist.size ()).toEqual(0);
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);

    arraylist.add (product1);
    arraylist.add (product2);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);

    list.clear ();

    expect (arraylist.isEmpty ()).toEqual(true);
    expect (arraylist.size ()).toEqual(0);
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);

    arraylist.add (product1);
    arraylist.add (product2);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);

    collection.clear ();

    expect (arraylist.isEmpty ()).toEqual(true);
    expect (arraylist.size ()).toEqual(0);
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);
  });



});
