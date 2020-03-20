import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Region } from '../shared/region.model';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.scss']
})
export class RegionFormComponent implements OnInit {

  @Input()
  set value(reg: Region){
    if(reg != null){
      this.regionForm.patchValue({
        id: reg.id,
        maxHunters: reg.maxHunters,
        name: reg.name
      });
    }else{
      console.log('empty');
      
      this.clearForm();
    }
  }

  @Output()
  closed = new EventEmitter();

  @Output()
  valueChange = new EventEmitter<Region>();

  regionForm : FormGroup = new FormGroup({
    id: new FormControl(1,Validators.required),
    name: new FormControl('',Validators.required),
    maxHunters: new FormControl(0,Validators.min(0))
  });

  constructor() { }

  ngOnInit() { 
  }

  clearForm(){
    this.regionForm.patchValue({
      id: 1,
      name: '',
      maxHunters: 0
    });
  }

  save(){
    const val = this.regionForm.value;
    const region : Region = {
      id: val.id,
      maxHunters: val.maxHunters,
      name: val.name
    }
    this.valueChange.emit(region);
  }

  getNameError():string{
    let control = this.regionForm.get('name');
    if (control.hasError('required')) {
      return 'Name is required';
    }

    return control.hasError('minlength') ? 'Minimum 4 characters' : '';
  }

  getIdError():string{
    let control = this.regionForm.get('id');
    if (control.hasError('required')) {
      return 'Id is required';
    }
    return '';
  }

}
