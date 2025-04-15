abstract class DeliveryItem {
  items: DeliveryItem[] = [];

  addItems(item: DeliveryItem) {
    this.items.push(item);
  }

  getItemPrices():number{
    return this.items.reduce(
      (acc: number, i: DeliveryItem) => (acc += i.getPrice()),
      0
    )
  }

  abstract getPrice(): number;
}

export class DeliveryShop extends DeliveryItem {
  constructor(public deliveryFee: number) {
    super();
  }

  getPrice(): number {
    return this.getItemPrices() + this.deliveryFee;
  }
}

export class Package extends DeliveryItem {

  getPrice(): number {
    return this.getItemPrices();
  }
}

export class Product extends DeliveryItem {
  constructor(private price: number) {
    super();
  }
  getPrice(): number {
    return this.price;
  }
}

const shop = new DeliveryShop(100);
shop.addItems(new Product(1000));

const pack1 = new Package();
pack1.addItems(new Product(200));
pack1.addItems(new Product(300));
shop.addItems(pack1);

const pack2 = new Package();
pack2.addItems(new Product(5));



