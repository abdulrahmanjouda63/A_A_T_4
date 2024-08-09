import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isLogin : boolean = false

  constructor(private _AuthService:AuthService,private _Router:Router){}

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
     next:()=>{

       if(this._AuthService.userData.getValue()==null){
         this.isLogin = false
       }else{
         this.isLogin  = true
       }
     }
    })
   }

  Logout(){
    localStorage.removeItem('userToken');
    this._AuthService.userData.next(null);
    this._Router.navigate(['login'])
  }
}
