import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
 LoginForm : FormGroup = new FormGroup({
  email : new FormControl(null,[Validators.required,Validators.email]),
  password : new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{5,}$/)]),
 })

  constructor(private _AuthService:AuthService, private _Router:Router){}

  isLoading : boolean = false
  errorMass : string = ''

 loginSbmit(){

  this.isLoading = true

 this._AuthService.sendLogin(this.LoginForm.value).subscribe({
  next : (data)=>{
       //1-localstorage:
       localStorage.setItem('userToken',data.token)
       //decode Token from service :
       this._AuthService.userInform()
       this._Router.navigate(['home'])
       this.isLoading=false
  },
  error: (err)=>{
    this.errorMass = err.error.message
    this.isLoading = false
  }
 })
 }
}

