import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  myRegisterForm : FormGroup = new FormGroup({
    name : new FormControl (null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl (null , [Validators.required, Validators.email]),
    phone: new FormControl (null , [Validators.required, Validators.pattern(/^(012|011|010|015)[0-9]{8}$/)]),
    password : new FormControl ( null , [Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{5,}$/)]),
    rePassword : new FormControl ( null , [Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{5,}$/)])
  },this.confirmPass)

  constructor(private _AuthService:AuthService, private _Router:Router){}

  confirmPass(pass:any){
    if(pass.get('password')?.value === pass.get('rePassword').value){
      return null
    }
    else{
      return {'passMatched' : true}
    }
  }

   isLoading : boolean = false
   errMessage :string = ''

    //submit el buttom:
    RegisterSubmit(){

      this.isLoading = true

     this._AuthService.sendRegister(this.myRegisterForm.value ).subscribe({
      next:(res)=>{
        this._Router.navigate(['login']),
        this.isLoading = false
      },
      error:(errrr)=>{
        this.errMessage = errrr.error.message,
        this.isLoading = false
      }
     })
    }

}
