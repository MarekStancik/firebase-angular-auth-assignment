import { ProductRepository } from "../../src/products/product.repository";
import { IMock,Mock } from 'moq.ts';
import { ProductService } from "../../src/products/product.service";
import { ProductModel } from "../../src/products/shared/product.model";

describe('ProductService',() => {
    let productRepo: IMock<ProductRepository>;
    let productService: ProductService;
    let product: ProductModel = { 
        url: 'a',
        name: 'prodName',
        price: 20,
        uid: 'ab',
        timesPurchased: 0
    }

    beforeEach(() => {
       /* productRepo = new Mock<ProductRepository>()
            .setup(repo => repo.setTopProducts(product))
            .returns(Promise.resolve());
        productService = new ProductService(productRepo.object());*/
    });



});