import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MybooksComponent } from './mybooks/mybooks.component';
import { AddbookComponent } from './addbook/addbook.component';
import { ListbooksComponent } from './listbooks/listbooks.component';
import { MyloansComponent } from './myloans/myloans.component';
import { AdduserComponent } from './adduser/adduser.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './shared/auth-guard.service';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'add-user', component: AdduserComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: 'my-books', component: MybooksComponent, canActivate: [AuthGuardService] },
      { path: 'my-loans', component: MyloansComponent, canActivate: [AuthGuardService] },
      { path: 'list-books', component: ListbooksComponent, canActivate: [AuthGuardService] },
      { path: 'add-book', component: AddbookComponent, canActivate: [AuthGuardService] },
    ]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
