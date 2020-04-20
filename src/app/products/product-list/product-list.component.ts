import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../shared/product.state';
import { Observable } from 'rxjs';
import { GetProducts, DeleteProduct, SetSelectedProduct } from '../shared/product.action';
import { ProductModel } from '../shared/product-model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Select(ProductState.getProductList) products: Observable<ProductModel[]>;

  constructor(private store: Store) {
  }

  ngOnInit() {
      this.store.dispatch(new GetProducts());
  }

  deleteProduct(id: string) {
      this.store.dispatch(new DeleteProduct(id));
  }

  editProduct(payload: ProductModel) {
      this.store.dispatch(new SetSelectedProduct(payload));
  }

}
