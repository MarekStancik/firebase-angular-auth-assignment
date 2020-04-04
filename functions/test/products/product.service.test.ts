import { ProductRepository } from "../../src/products/product.repository";
import { IMock, Times } from 'moq.ts';
import { ProductService } from "../../src/products/product.service";
import { ProductModel } from "../../src/products/shared/product.model";
import { StockRepository } from "../../src/stocks/stock.repository";
import { OrderRepository } from "../../src/orders/order.repository";
import { DataTestHelper } from "../helpers/data.test.helper";
import { RepositoryTestHelper } from "../helpers/repository.test.helper";

describe('ProductService',() => {
    let dataTestHelper: DataTestHelper;
    let repositoryTestHelper: RepositoryTestHelper;
    let productRepo: IMock<ProductRepository>;
    let stockRepo: IMock<StockRepository>;
    let orderRepo: IMock<OrderRepository>;
    let productService: ProductService;

    beforeEach(() => {
        dataTestHelper = new DataTestHelper();
        repositoryTestHelper = new RepositoryTestHelper(dataTestHelper);
        orderRepo = repositoryTestHelper.getOrderRepositoryMock();
        stockRepo = repositoryTestHelper.getStockRepositoryMock();
        productRepo = repositoryTestHelper.getProductRepositoryMock();
        productService = new ProductService(productRepo.object(),stockRepo.object(),orderRepo.object());
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
        await expect(productService.productCreated(dataTestHelper.product1))
            .resolves.toEqual(dataTestHelper.product1);
    })

    it('Creating product will call add product of count 5 to stock',async () => {
        await productService.productCreated(dataTestHelper.product1);
        stockRepo.verify(repo => repo.addProduct(dataTestHelper.product1,5),Times.Once());
    })

    it('Changing product name changes it everywhere', async() =>{
        const before = dataTestHelper.product1;
        const after : ProductModel = {
            name: before.name + ' karol',
            price: before.price,
            uid: before.uid,
            url: before.url
        }
        await productService.productUpdated(before.uid,before,after);
        orderRepo.verify(repo => repo.updateName(before.uid,after.name),Times.Once());
        stockRepo.verify(repo => repo.updateName(before.uid,after.name),Times.Once());
    })

});