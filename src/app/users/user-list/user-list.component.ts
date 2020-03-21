import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from '../shared/user.service';
import { UserModel } from '../shared/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Output() selected = new EventEmitter<UserModel>();
  
  displayedColumns: string[] = [ 'name', 'email', 'phone',"role"];
  dataSource : MatTableDataSource<UserModel> = new MatTableDataSource<UserModel>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  selectedRow: UserModel = null;

  private isLoaded_ = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers()
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

  getRecord(row: UserModel){
    this.selectedRow = row;
    this.selected.emit(row);
  }

  isLoaded():boolean{
    return this.isLoaded_;
  }

}
