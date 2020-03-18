import { Component, OnInit } from '@angular/core';
import { RegionService } from 'src/app/regions/shared/region.service';

@Component({
  selector: 'app-regions-view',
  templateUrl: './regions-view.component.html',
  styleUrls: ['./regions-view.component.scss']
})
export class RegionsViewComponent implements OnInit {

  constructor(private regService: RegionService) { }

  ngOnInit() {
  }

  addRegion(){
    this.regService.addRegion({id: 1,
      maxHunters: 10,
      name: 'Trnava'
    });
  }

}
