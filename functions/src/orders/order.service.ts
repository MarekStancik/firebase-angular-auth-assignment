import { OrderModel } from "./shared/order.model";
import { OrderRepository } from "./order.repository";
import { StockRepository } from "../stocks/stock.repository";

export class OrderService{
    constructor(private orderRepository: OrderRepository, private stockRepository: StockRepository) {
        if(this.stockRepository === undefined || this.orderRepository === undefined
            || this.stockRepository === null || this.orderRepository === null)
            throw Error("Order service needs order and stock Repository to be created");
      }
    

    async addOrder(order: OrderModel): Promise<OrderModel>{
        if(!order.orderLines || order.orderLines.length < 1) {
            throw new RangeError('At least 1 orderline is needed to add order');
        }

        if(order.orderLines.length === 1) {
            await this.stockRepository.lowerStock(order.orderLines[0].product, order.orderLines[0].amount);
        }
        else {
            await this.stockRepository.lowerStocks(order.orderLines);
        }

        await this.orderRepository.addOrder(order);

        return Promise.resolve(order);
    }
}