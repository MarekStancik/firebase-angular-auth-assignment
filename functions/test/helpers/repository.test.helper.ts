import {IMock, It, Mock} from 'moq.ts';
import {ProductRepository} from '../../src/products/product.repository';
import {StockRepository} from '../../src/stocks/stock.repository';
import {OrderRepository} from '../../src/orders/order.repository';
import {DataTestHelper} from './data.test.helper';

export class RepositoryTestHelper {
  constructor(private db: DataTestHelper) {}
  getProductRepositoryMock(): IMock<ProductRepository> {
    return new Mock<ProductRepository>();
  }

  getOrderRepositoryMock(): IMock<OrderRepository> {
    return new Mock<OrderRepository>()
    .setup(repo => repo.addOrder(this.db.order1))
    .returns(Promise.resolve())
    .setup(repo => repo.updateName("product","name"))
    .returns(Promise.resolve());
  }

  getStockRepositoryMock(): IMock<StockRepository> {
    return new Mock<StockRepository>()
      .setup(stockRepo => stockRepo.addProduct(this.db.product1, 5))
      .returns(Promise.resolve(this.db.stock1))
      .setup(stockRepo => stockRepo.lowerStock(It.IsAny(), It.IsAny()))
      .returns(Promise.resolve())
      .setup(stockRepo => stockRepo.lowerStocks(It.IsAny()))
      .returns(Promise.resolve())
      .setup(repo => repo.updateName("product","name"))
      .returns(Promise.resolve());
  }
}