import {OrderService} from '../../src/orders/order.service';
import {IMock, Times} from 'moq.ts';
import {OrderRepository} from '../../src/orders/order.repository';
import {RepositoryTestHelper} from '../helpers/repository.test.helper';
import {StockRepository} from '../../src/stocks/stock.repository';
import {DataTestHelper} from '../helpers/data.test.helper';

describe('OrderService', () => {
  let dataTestHelper: DataTestHelper;
  let repositoryTestHelper: RepositoryTestHelper;
  let stockRepository: IMock<StockRepository>;
  let orderRepository: IMock<OrderRepository>;
  let orderService: OrderService;

  beforeEach(() => {
    dataTestHelper = new DataTestHelper();
    repositoryTestHelper = new RepositoryTestHelper(dataTestHelper);
    orderRepository = repositoryTestHelper.getOrderRepositoryMock();
    stockRepository = repositoryTestHelper.getStockRepositoryMock();
    orderService = new OrderService(orderRepository.object(), stockRepository.object());
  });

  it('OrderService cant be created without orderRepository and stockRepository', () => {
    expect(() => new OrderService(null as any, null as any))
    .toThrowError("Order service needs order and stock Repository to be created");
  });

  it('Adding order requires at least 1 orderline otherwise throws RangeError', async () => {
    const order = dataTestHelper.order1;
    order.orderLines = [];
    await expect(orderService.addOrder(order)).rejects.toThrow(RangeError);
    await expect(orderService.addOrder(order)).rejects.toThrow('At least 1 orderline is needed to add order');
  });

  it('Adding order calls addOrder exactly one time on orderRepository', async () => {
    const order = dataTestHelper.order1;
    await orderService.addOrder(order);
    orderRepository.verify(repo => repo.addOrder(order),Times.Exactly(1));
  });

  it('Adding order with one orderline decrement the stockRepository with correct amount', async () => {
    const order = dataTestHelper.order1;
    await orderService.addOrder(order);
    stockRepository.verify(stockRepo => stockRepo.lowerStock(order.orderLines[0].product, order.orderLines[0].amount),
       Times.Exactly(1));
  });

  it('Adding order with multiple orderlines decrement the stockRepository with correct amount', async () => {
    const order = dataTestHelper.order2;
    const orderLines = order.orderLines;
    await orderService.addOrder(order);
    stockRepository.verify(stockRepo => stockRepo.lowerStocks(orderLines),
      Times.Exactly(1))
   ;
  });
});