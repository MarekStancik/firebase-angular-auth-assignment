import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Region } from './region.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

const collectionName = 'regions';

@Injectable({
  providedIn: 'root'
})

export class RegionService {

  constructor(private afs: AngularFirestore) { }

  getRegions() : Observable<Region[]>{
    return this.afs.collection<Region>(collectionName)
      .snapshotChanges()
      .pipe(
        map(val => {
          return val.map(a => {
            var region: Region;
            region = a.payload.doc.data()
            region.uid = a.payload.doc.id;
            return region;
          })
        })
      );
  }

  addRegion(region: Region): Promise<Region>{
    return new Promise((resolve,reject) => {
      this.afs.collection<Region>(collectionName).add(region)
        .then(ref => {
          region.uid = ref.id
          resolve(region);
        })
        .catch(err => reject(err));
    });
  }

  delete(region: Region):Promise<void>{
    return this.afs.collection<Region>(collectionName).doc(region.uid).delete();
  }
}
