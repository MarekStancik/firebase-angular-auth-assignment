import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Region } from '../shared/region.model';
import { RegionService } from '../shared/region.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {
  @Output() selected = new EventEmitter<Region>();
  
  displayedColumns: string[] = [ 'name', 'hunterCount', 'animalCount',"maxHunters"];
  dataSource : MatTableDataSource<Region> = new MatTableDataSource<Region>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedRow: Region = null;

  private isLoaded_ = false;

  constructor(private regionService: RegionService) { }

  ngOnInit() {    
    this.regionService.getRegions()
      .subscribe(data => {
        this.dataSource.data = data;
        this.isLoaded_ = true;
      });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRecord(row: Region){
    this.selectedRow = row;
    this.selected.emit(row);
  }

  isLoaded():boolean{
    return this.isLoaded_;
  }

}
