import { RegionController } from "./regions/region.controller";
import { RegionRepository } from "./regions/region.repository";
import { RegionRepositoryFirebase } from "./regions/region.repository.firebase";
import { RegionService } from "./regions/region.service";
import { RegionControllerFirebase } from "./regions/region.controller.firebase";
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
import { OrderController } from "./orders/order.controller";
import { OrderRepository } from "./orders/order.repository";
import { OrderRepositoryFirebase } from "./orders/order.repository.firebase";
import { OrderService } from "./orders/order.service";
import { OrderControllerFirebase } from "./orders/order.controller.firebase";
import { StockController } from "./stocks/stock.controller";
import { StockRepository } from "./stocks/stock.repository";
import { StockRepositoryFirebase } from "./stocks/stock.repository.firebase";
import { StockService } from "./stocks/stock.service";
import { StockControllerFirebase } from "./stocks/stock.controller.firebase";

export class DependencyFactory{

    getRegionController(): RegionController{
        const repo: RegionRepository = new RegionRepositoryFirebase();
        const service: RegionService = new RegionService(repo);
        return new RegionControllerFirebase(service);
    }

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
        const repo: OrderRepository = new OrderRepositoryFirebase();
        const service: OrderService = new OrderService(repo);
        return new OrderControllerFirebase(service);
    }

    getStockController(): StockController{
        const repo: StockRepository = new StockRepositoryFirebase();
        const service: StockService = new StockService(repo);
        return new StockControllerFirebase(service);
    }
}