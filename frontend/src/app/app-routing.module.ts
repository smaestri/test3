import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MybooksComponent } from './mybooks/mybooks.component';
import { AddbookComponent } from './addbook/addbook.component';
import { ListbooksComponent } from './listbooks/listbooks.component';
import { MyloansComponent } from './myloans/myloans.component';

const routes: Routes = [
  { path: '', component: MybooksComponent},
  { path: 'add-book', component: AddbookComponent},
  { path: 'list-books', component: ListbooksComponent},
  { path: 'my-loans', component: MyloansComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
