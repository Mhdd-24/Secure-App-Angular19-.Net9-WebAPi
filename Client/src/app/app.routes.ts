import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { authGuard } from './guard/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { roleGuard } from './guard/role.guard';
import { RoleComponent } from './pages/role/role.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'account/:id',
    component: AccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['test'],
    }
  },
  {
    path: 'roles',
    component: RoleComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['test'],
    }
  },
];