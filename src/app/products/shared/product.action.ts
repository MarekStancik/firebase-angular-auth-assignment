import { ProductModel } from './product-model';

export class AddProduct{
    static readonly type = '[Product] Add';

    constructor(public payload: ProductModel){

    }
}

export class DeleteProduct{
    static readonly type = '[Product] Delete';

    constructor(public id: string){

    }
}

export class UpdateProduct{
    static readonly type = '[Product] Update';

    constructor(public payload: ProductModel){

    }
}

export class SetSelectedProduct{
    static readonly type = '[Product] Set';

    constructor(public payload: ProductModel){

    }
}

export class GetProducts{
    static readonly type = '[Product] Get';
}