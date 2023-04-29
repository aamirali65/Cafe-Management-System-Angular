import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ItemsComponent } from './components/items/items.component';
import { AddItemsComponent } from './components/add-items/add-items.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { OrderComponent } from './components/order/order.component';
import { NgbNavModule,NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPrintElementModule } from 'ngx-print-element';

import { CalendarComponent } from './components/calendar/calendar.component';
import { UserComponent } from './components/user/user.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ItemsComponent,
    AddItemsComponent,
    ViewItemsComponent,
    ViewCategoryComponent,
    AddCategoryComponent,
    OrderComponent,
    CalendarComponent,
    UserComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbDatepickerModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule ,
    NoopAnimationsModule ,
    ToastrModule.forRoot(),
    [NgbNavModule],
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
