import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {EditAccountComponent} from './edit-account/edit-account.component'
import {UserGuard } from '../../guards/user-guard/user.guard'
import {ResetPasswordComponent} from './reset-password/reset-password.component'
import {VerificationEmailComponent} from './verification-email/verification-email.component'
import {SetNewPasswordComponent} from './set-new-password/set-new-password.component'
import { NoAuthGuard } from 'src/app/guards/no-auth-guard/no-auth.guard';
import { AuthGuard } from 'src/app/guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'about', component: AboutUsComponent },
      { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
      { path: 'checkout', component: CheckoutComponent , canActivate: [UserGuard]},
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'compare', component: CompareComponent },
      { path: 'my-account', component: MyAccountComponent,canActivate: [NoAuthGuard] },
      { path: 'edit-account', component: EditAccountComponent, canActivate: [AuthGuard] },
      { path: 'error', component: ErrorPageComponent },
      { path: 'reset-password', component: ResetPasswordComponent, canActivate: [NoAuthGuard] },
      { path: 'verification-email', component: VerificationEmailComponent, canActivate: [NoAuthGuard]},
      { path: 'set-new-paswword', component: SetNewPasswordComponent, canActivate: [NoAuthGuard]},

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
