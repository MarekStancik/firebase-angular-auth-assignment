import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Region } from './region.model';
import { AngularFirestore } from '@angular/fire/firestore';

const collectionName = 'regions';

const ELEMENT_DATA: Region[] = [
  {id: 1, name: 'Hydrogen', hunterCount: 1, animalCount: 20 ,maxHunters: 40},
  {id: 2, name: 'Helium', hunterCount: 4, animalCount: 250,maxHunters: 40},
  {id: 3, name: 'Lithium', hunterCount: 6, animalCount: 260,maxHunters: 40},
  {id: 4, name: 'Beryllium', hunterCount: 9, animalCount: 120,maxHunters: 40}
];

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
