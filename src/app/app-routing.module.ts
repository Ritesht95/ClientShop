import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ShopComponent } from './shop/shop.component';
import { AddressComponent } from './address/address.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', component: NotfoundComponent },
  { path: 'cat', component: CategoriesComponent },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: 'product', component: ProductComponent },
  { path: 'contactUs', component: ContactComponent },
  { path: 'reset', component: ResetpasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: '*', component: NotfoundComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'address', component: AddressComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'orderDetail', component: OrderDetailComponent},
  { path: 'order', component: OrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {}
