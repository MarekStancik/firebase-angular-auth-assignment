import { UserController } from "./users/user.controller";
import { UserRepository } from "./users/user.repository";
import { UserRepositoryFirebase } from "./users/user.repository.firebase";
import { UserService } from "./users/user.service";
import { UserControllerFirebase } from "./users/user.controller.firebase";
import { ProductController } from "./products/product.controller";
import { ProductRepositoryFirebase } from "./products/product.repository.firebase";
import { ProductService } from "./products/product.service";
import { ProductRepository } from "./products/product.repository";
import { ProductControllerFirebase } from "./products/product.controller.firebase";
import { StockRepository } from "./stocks/stock.repository";
import { StockRepositoryFirebase } from "./stocks/stock.repository.firebase";
import { OrderController } from "./orders/order.controller";
import { OrderRepository } from "./orders/order.repository";
import { OrderRepositoryFirebase } from "./orders/order.repository.firebase";
import { OrderService } from "./orders/order.service";
import { OrderControllerFirebase } from "./orders/order.controller.firebase";

export class DependencyFactory{

    getUserController(): UserController{
        const repo: UserRepository = new UserRepositoryFirebase();
        const service: UserService = new UserService(repo);
        return new UserControllerFirebase(service);
    }

    getProductController(): ProductController{
        const prodRepo: ProductRepository = new ProductRepositoryFirebase();
        const stockRepo: StockRepository = new StockRepositoryFirebase();
        const service: ProductService = new ProductService(prodRepo,stockRepo);
        return new ProductControllerFirebase(service);
    }

    getOrderController(): OrderController{
        const orderRepo: OrderRepository = new OrderRepositoryFirebase();
        const stockRepo: StockRepository = new StockRepositoryFirebase();
        const service: OrderService = new OrderService(orderRepo,stockRepo);
        return new OrderControllerFirebase(service);
    }
}