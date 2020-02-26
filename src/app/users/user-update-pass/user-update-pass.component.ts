import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorStateMatcher } from '@angular/material';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-user-update-pass',
  templateUrl: './user-update-pass.component.html',
  styleUrls: ['./user-update-pass.component.scss']
})
export class UserUpdatePassComponent implements OnInit {

  matcher = new MyErrorStateMatcher();

  passwordForm = new FormGroup({
    oldPass: new FormControl('',[Validators.required,Validators.minLength(AuthService.MIN_PASS_LENGTH)]),
    newPass: new FormControl('',[Validators.required,Validators.minLength(AuthService.MIN_PASS_LENGTH)]),
    repeatNewPass: new FormControl('',[Validators.required,Validators.minLength(AuthService.MIN_PASS_LENGTH)])
  },{validators: this.checkPasswords});

  constructor(private _auth: AuthService) { }

  checkPasswords(group: FormGroup){
    let pass = group.get('newPass').value;
    let confirmPass = group.get('repeatNewPass').value;
  
    return pass === confirmPass ? null : { notSame: true }   
  }

  updatePassword(){
    if(!this.passwordForm.invalid){
      let newPass = this.passwordForm.value.newPass;
      let oldPass = this.passwordForm.value.oldPass;
      this._auth.reauthenticate(oldPass)
        .then(() => {
          this._auth.changePassword(newPass)
          .then(()=>alert("Password has been updated"))
          .catch((err)=>alert("Error updating password: " + err.message));
        })
        .catch((err)=>{
          alert(err.message);
        });      
    }
  }

  isValid(){
    return !this.passwordForm.invalid;
  }

  getErrorFor(name: string){
    if(name === 'repeatNewPass'){
      return this.passwordForm.hasError('notSame') ? 'Passwords are not matching' : '';
    }

    let control = this.passwordForm.get(name);
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    
    return control.hasError('minlength') ? `Minimum ${AuthService.MIN_PASS_LENGTH} characters required` : '';
  }

  ngOnInit() {
  }

}
