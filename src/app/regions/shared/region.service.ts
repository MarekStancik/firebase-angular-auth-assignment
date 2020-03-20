import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Region } from './region.model';
import { AngularFirestore } from '@angular/fire/firestore';

const collectionName = 'regions';

@Injectable({
  providedIn: 'root'
})

export class RegionService {

  constructor(private afs: AngularFirestore) { }

  getRegions() : Observable<Region[]>{
    return this.afs.collection<Region>(collectionName).valueChanges();
    //return of(ELEMENT_DATA);
  }

  addRegion(region: Region){
    this.afs.collection<Region>(collectionName).add(region);
  }
}
