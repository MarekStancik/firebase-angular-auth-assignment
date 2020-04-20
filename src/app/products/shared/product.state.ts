import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { ProductModel } from './product-model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import { AddProduct, DeleteProduct, GetProducts, UpdateProduct, SetSelectedProduct } from './product.action';
import { tap } from 'rxjs/operators';

export class ProductStateModel{
    products: ProductModel[];
    selectedProduct: ProductModel;
}

@State<ProductStateModel>({
    name: 'product',
    defaults:{
        products: [],
        selectedProduct: null
    }
})
@Injectable()
export class ProductState {

    constructor(private _productsService: ProductService){

    }

    @Selector()
    static getProductList(state: ProductStateModel){
        return state.products;
    }

    @Selector()
    static getSelectedProduct(state: ProductStateModel){
        return state.selectedProduct;
    }

    @Action(GetProducts)
    getProducts({getState, setState}: StateContext<ProductStateModel>){
        return this._productsService
        .fetchProducts()
        .pipe(
            tap(result => {
              const state = getState();
              setState({
                  ...state,
                  products: result
              })  
            })
        )
    }

    @Action(AddProduct)
    addProduct({getState,patchState}: StateContext<ProductStateModel>,{payload}: AddProduct){
        return this._productsService
            .addProduct(payload)
            .then((result) => {
                const state = getState();
                patchState({
                    products: [...state.products,result]
                })
            })
    }

    @Action(UpdateProduct)
    updateProduct({getState,setState}: StateContext<ProductStateModel>,{payload}: UpdateProduct){
        return this._productsService.updateProduct(payload)
        .then(result => {
            const state = getState();
            const productList = [...state.products];
            const productIndex = productList.findIndex(it => it.uid === result.uid);
            productList[productIndex] = result;
            setState({
                ...state,
                products: productList
            })
        });
    }

    @Action(DeleteProduct)
    deleteProduct({getState,setState}: StateContext<ProductStateModel>,{id}: DeleteProduct){
        return this._productsService.deleteProduct(id)
        .then(() => {
            const state = getState();
            const filteredArray = state.products.filter(item => item.uid !== id);
            setState({
                ...state,
                products: filteredArray,
            });
        });
    }

    @Action(SetSelectedProduct)
    setSelectedProduct({getState,setState}: StateContext<ProductStateModel>,{payload}: SetSelectedProduct){
        const state = getState();
        setState({
            ...state,
            selectedProduct: payload
        });
    }
}
