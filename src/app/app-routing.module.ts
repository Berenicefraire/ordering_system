import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
// home, orders, create-order

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data:{title_section: 'Home'}},
  { path: 'create-order', component: NewOrderComponent, data: {title_section: 'Create New Order'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

