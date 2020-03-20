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
    this.regService.addRegion(region);
  }

  onSelect(region: Region){
    //Note it is important that form open is after settign region
    this.region = {
      id: region.id,
      name: region.name,
      maxHunters: region.maxHunters
    };
    this.formOpened = true;
  }

}
