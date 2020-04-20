import { Injectable } from '@angular/core';
import { ProductModel } from './product-model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

const colName = 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _afs: AngularFirestore
  ) { }

  async addProduct(product: ProductModel){
    const ref = await this._afs.collection(colName).add(product);
    product.uid = ref.id;
    return Promise.resolve(product);
  }

  async updateProduct(product: ProductModel) {
    await this._afs.collection(colName).doc(product.uid).set(product,{merge: true});
    return Promise.resolve(product);
  }

  deleteProduct(id: string) {
    return this._afs.collection(colName).doc(id).delete();
  }

  fetchProducts() {
    return this._afs.collection<ProductModel>(colName)
      .get()
      .pipe(
        map(val => {
          var arr: ProductModel[] = [];
          val.forEach(doc => {
            var product = doc.data() as ProductModel;
            product.uid = doc.id;
            arr.push(product)
          })
          return arr;
        })
      )/*
    .snapshotChanges()
    .pipe(
      map(val => {
        return val.map(a => {
          var product: ProductModel;
          product = a.payload.doc.data()
          product.uid = a.payload.doc.id;
          return product;
        })
      })
    )*/
  }
}
