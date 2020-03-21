import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/regions/shared/region.service';
import { Region } from 'src/app/regions/shared/region.model';

@Component({
  selector: 'app-regions-view',
  templateUrl: './regions-view.component.html',
  styleUrls: ['./regions-view.component.scss']
})
export class RegionsViewComponent implements OnInit {

  formOpened = false;

  region : Region;

  constructor(private regService: RegionService) { }

  ngOnInit() {
  }

  addRegion(){
    //Note it is important that form open is after settign region
    this.region = null;
    this.formOpened = true;
  }

  save(region: Region){
    this.regService.addRegion(region)
      .then(() => this.formOpened = false)
      .catch(err => alert(err.message));
  }

  delete(region: Region){
    if(region){
      this.regService.delete(region)
        .then(() =>{ 
          this.region = null
        })
        .catch(err => alert(err.message));
    }
  }

  onSelect(region: Region){
    //Note it is important that form open is after settign region
    this.region = {
      uid: region.uid,
      name: region.name,
      maxHunters: region.maxHunters
    };
    this.formOpened = true;
  }

}
