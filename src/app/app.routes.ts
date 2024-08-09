import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { NotfoundComponent } from './layout/additions/notfound/notfound.component';
import { authGuardGuard } from './shared/guards/auth-guard.guard';


export const routes: Routes = [
    
    {path:'', redirectTo:'login',pathMatch:'full'},
    {path:'home',component:HomeComponent,canActivate:[authGuardGuard]},
    {path:'carts',component:CartComponent,canActivate:[authGuardGuard]},
    {path:'products',component:ProductsComponent,canActivate:[authGuardGuard]},
    {path:'brands',component:BrandsComponent,canActivate:[authGuardGuard]},
    {path:'categories',component:CategoriesComponent,canActivate:[authGuardGuard]},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'**',component:NotfoundComponent},
];
