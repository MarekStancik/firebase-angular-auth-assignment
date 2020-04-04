import { OrderModel } from "./shared/order.model";
import { OrderRepository } from "./order.repository";
import { StockRepository } from "../stocks/stock.repository";

export class OrderService{
    constructor(private orderRepository: OrderRepository, private stockRepository: StockRepository) {
        console.log(this.orderRepository);
        console.log(this.stockRepository);
      }
    

    async addOrder(order: OrderModel): Promise<OrderModel>{
        if(!order.orderLines || order.orderLines.length < 1) {
            throw new TypeError('You need orderlines to execute a order');
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