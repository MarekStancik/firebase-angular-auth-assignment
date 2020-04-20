import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../shared/product.state';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateProduct, AddProduct, SetSelectedProduct } from '../shared/product.action';
import { ProductModel } from '../shared/product-model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Select(ProductState.getSelectedProduct) selectedProduct: Observable<ProductModel>;
  productForm: FormGroup;
  editProduct = false;
  private formSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder, 
    private store: Store, 
    private route: ActivatedRoute, 
    private router: Router) {
      this.createForm();
  }

  ngOnInit() {
      this.formSubscription.add(
        this.selectedProduct.subscribe(prod => {
          if (prod) {
            this.productForm.patchValue({
              uid: prod.uid,
              name: prod.name,
              price: prod.price,
              url: prod.url
            });
            this.editProduct = true;
          } else {
            this.editProduct = false;
          }
        })
      );
  }

  createForm() {
      this.productForm = this.fb.group({
          name: ['', Validators.required],
          price: ['', Validators.required],
          url: [''],
      });
  }

  onSubmit() {
      if (this.editProduct) {
        this.formSubscription.add(
          this.store.dispatch(new UpdateProduct(this.productForm.value)).subscribe(() => {
            this.clearForm();
          })
        );
      } else {
        this.formSubscription.add(
          this.formSubscription = this.store.dispatch(new AddProduct(this.productForm.value)).subscribe(() => {
            this.clearForm();
          })
        );
      }
  }

  clearForm() {
      this.productForm.reset();
      this.store.dispatch(new SetSelectedProduct(null));
  }
}
