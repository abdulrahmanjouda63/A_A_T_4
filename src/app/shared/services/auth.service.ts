import { HttpClient } from '@angular/common/http';
import { afterNextRender, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Register, Login } from '../interfaces/register';
import { Environment } from '../../Base/Enviroment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData : BehaviorSubject<any> = new BehaviorSubject(null)
  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    afterNextRender(()=>{
      if(localStorage.getItem('userToken') != null){
        this.userInform()
        _Router.navigate([localStorage.getItem('currentPage')])
      }
    })
  }

  sendRegister(data:Register):Observable<any>
  {
   return this._HttpClient.post(`${Environment.BaseURL}/api/v1/auth/signup`,data)
  }

  sendLogin(data:Login):Observable<any>
  {
   return this._HttpClient.post(`${Environment.BaseURL}/api/v1/auth/signin`,data)
  }

  userInform(){
    this.userData.next(jwtDecode(JSON.stringify(localStorage.getItem("userToken"))))
    console.log(this.userData.getValue());
  }
}
