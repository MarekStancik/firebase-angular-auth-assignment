import { ProductRepository } from "../../src/products/product.repository";
import { IMock,Mock, Times } from 'moq.ts';
import { ProductService } from "../../src/products/product.service";
import { ProductModel } from "../../src/products/shared/product.model";
import { StockRepository } from "../../src/stocks/stock.repository";

describe('ProductService',() => {
    let productRepo: IMock<ProductRepository>;
    let stockRepo: IMock<StockRepository>;
    let productService: ProductService;
    let product: ProductModel = { 
        url: 'a',
        name: 'prodName',
        price: 20,
        uid: 'ab',
        timesPurchased: 0
    }

    beforeEach(() => {
        productRepo = new Mock<ProductRepository>()
        stockRepo = new Mock<StockRepository>()
            .setup(repo => repo.addProduct(product,5))
            .returns(Promise.resolve());
        productService = new ProductService(productRepo.object(),stockRepo.object());
    });

    it('Creating undefined product rejects',async () =>{
        await expect(productService.productCreated(undefined as any))
            .rejects.toEqual('Provided product is not of type ProductModel');
    })

    
    it('Creating null product rejects',async () =>{
        await expect(productService.productCreated(null as any))
            .rejects.toEqual('Provided product is not of type ProductModel');
    })

    it('Creating product will resolves with the same product',async () => {
        await expect(productService.productCreated(product))
            .resolves.toEqual(product);
    })

    it('Creating product will call add product of count 5 to stock',async () => {
        await productService.productCreated(product);
        stockRepo.verify(repo => repo.addProduct(product,5),Times.Once());
    })



});