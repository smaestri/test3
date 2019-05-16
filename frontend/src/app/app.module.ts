import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MybooksComponent } from './mybooks/mybooks.component';
import { AddbookComponent } from './addbook/addbook.component';
import { BookComponent } from './book/book.component';
import { HeaderComponent } from './header/header.component';
import { ListbooksComponent } from './listbooks/listbooks.component';
import { MyloansComponent } from './myloans/myloans.component';
import { LoginComponent } from './login/login.component';
import { AdduserComponent } from './adduser/adduser.component';
import { HomeComponent } from './home/home.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TokenInterceptor } from './shared/interceptor';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MybooksComponent,
    AddbookComponent,
    BookComponent,
    HeaderComponent,
    ListbooksComponent,
    MyloansComponent,
    LoginComponent,
    AdduserComponent,
    HomeComponent,
    SpinnerComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
