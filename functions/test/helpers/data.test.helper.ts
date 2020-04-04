import { ProductModel } from "../../src/products/shared/product.model";
import { StockModel } from "../../src/stocks/shared/stock.model";
import { OrderlineModel } from "../../src/orders/shared/orderline.model";
import { OrderModel } from "../../src/orders/shared/order.model";


export class DataTestHelper {
  product1: ProductModel = {
    name: 'Product 1',
    uid: 'p1',
    url: 'somewhere.com',
    price: 22
  };

  product2: ProductModel = {
    name: 'Product 2',
    uid: 'p2',
    url: 'somewhereelse.com',
    price: 23
  };

  stock1: StockModel = {
    count: 1,
    product: this.product1
  };

  ol1: OrderlineModel = {
    id: 'ol1',
    product: this.product1,
    amount: 1
  };

  ol2: OrderlineModel = {
    id: 'ol2',
    product: this.product2,
    amount: 2
  };

  order1: OrderModel = {
    id: 'o1',
    date: Date.now(),
    orderLines: [this.ol1],
    visible: false
  };

  order2: OrderModel = {
    id: 'o2',
    date: Date.now(),
    orderLines: [this.ol1, this.ol2],
    visible: false
  };
}