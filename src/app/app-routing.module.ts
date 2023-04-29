import { OrderComponent } from './components/order/order.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ViewCategoryComponent } from './components/view-category/view-category.component';
import { ViewItemsComponent } from './components/view-items/view-items.component';
import { ItemsComponent } from './components/items/items.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UserComponent } from './components/user/user.component';



const routes: Routes = [
  {
    path:'',component:HomeComponent , canActivate: [AuthGuard]
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'items',component:ItemsComponent   , canActivate: [AuthGuard]
  },
  {
    path:'view-items',component:ViewItemsComponent  , canActivate: [AuthGuard]
  },
  {
    path:'add-category',component:AddCategoryComponent  , canActivate: [AuthGuard]
  },
  {
    path:'view-category',component:ViewCategoryComponent  , canActivate: [AuthGuard]
  },
  {
    path:'order',component:OrderComponent  , canActivate: [AuthGuard]
  },
  {
    path:'calender',component:CalendarComponent , canActivate: [AuthGuard]
  },
  {
    path:'user',component:UserComponent , canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
