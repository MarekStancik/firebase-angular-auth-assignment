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
        const repo: ProductRepository = new ProductRepositoryFirebase();
        const service: ProductService = new ProductService(repo);
        return new ProductControllerFirebase(service);
    }
}