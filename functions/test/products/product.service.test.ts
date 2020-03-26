import { ProductRepository } from "../../src/products/product.repository";
import { IMock,Mock, Times } from 'moq.ts';
import { ProductService } from "../../src/products/product.service";
import { ProductModel } from "../../src/products/shared/product.model";
import { StockRepository } from "../../src/stocks/stock.repository";
import { OrderRepository } from "../../src/orders/order.repository";

describe('ProductService',() => {
    let productRepo: IMock<ProductRepository>;
    let stockRepo: IMock<StockRepository>;
    let orderRepo: IMock<OrderRepository>;
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
        orderRepo = new Mock<OrderRepository>()
            .setup(repo => repo.addProduct(product))
            .returns(Promise.resolve())
        orderRepo 
            .setup(repo => repo.updateName("product","name"))
            .returns(Promise.resolve());
        stockRepo = new Mock<StockRepository>()
            .setup(repo => repo.addProduct(product,5))
            .returns(Promise.resolve());
        stockRepo 
            .setup(repo => repo.updateName("product","name"))
            .returns(Promise.resolve());
        stockRepo
            .setup(repo => repo.changeCount(product,1))
            .returns(Promise.resolve())
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
        await expect(productService.productCreated(product))
            .resolves.toEqual(product);
    })

    it('Creating product will call add product of count 5 to stock',async () => {
        await productService.productCreated(product);
        stockRepo.verify(repo => repo.addProduct(product,5),Times.Once());
    })

    it('Buying product changes its count in stocks', async() =>{
        const before = product;
        const after : ProductModel = {
            name: product.name,
            price: product.price,
            timesPurchased: product.timesPurchased + 1,
            uid: product.uid,
            url: product.url
        }
        await productService.productUpdated(product.uid,before,after);
        stockRepo.verify(repo => repo.changeCount(after,1),Times.Once());
    })

    it('Returning product changes its count in stocks', async() =>{
        const before = product;
        const after : ProductModel = {
            name: product.name,
            price: product.price,
            timesPurchased: product.timesPurchased - 1,
            uid: product.uid,
            url: product.url
        }
        await productService.productUpdated(product.uid,before,after);
        stockRepo.verify(repo => repo.changeCount(after,-1),Times.Once());
    })

    it('Buying product adds it to orders', async() =>{
        const before = product;
        const after : ProductModel = {
            name: product.name,
            price: product.price,
            timesPurchased: product.timesPurchased + 1,
            uid: product.uid,
            url: product.url
        }
        await productService.productUpdated(product.uid,before,after);
        orderRepo.verify(repo => repo.addProduct(after),Times.Once());
    })

    it('Changing product name changes it everywhere', async() =>{
        const before = product;
        const after : ProductModel = {
            name: product.name + ' karol',
            price: product.price,
            timesPurchased: product.timesPurchased,
            uid: product.uid,
            url: product.url
        }
        await productService.productUpdated(product.uid,before,after);
        orderRepo.verify(repo => repo.updateName(product.uid,after.name),Times.Once());
        stockRepo.verify(repo => repo.updateName(product.uid,after.name),Times.Once());
    })

});