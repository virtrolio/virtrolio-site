import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

// Pages
import { AboutComponent } from './pages/about/about.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { SigningAuthRedirectComponent } from './pages/signing-auth-redirect/signing-auth-redirect.component';
import { HomeComponent } from './pages/home/home.component';
import { InvalidLinkComponent } from './pages/invalid-link/invalid-link.component';
import { MsgSentComponent } from './pages/msg-sent/msg-sent.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SigningComponent } from './pages/signing/signing.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { ViewingComponent } from './pages/viewing/viewing.component';
import { YourVirtrolioComponent } from './pages/your-virtrolio/your-virtrolio.component';

// Services
import { LoginResolver } from './core/login-resolver';
import { RejeccComponent } from './pages/rejecc/rejecc.component';
import { SigningGuard } from './core/signing.guard';

const redirectUnauthorized = () => redirectUnauthorizedTo([ '/access-denied' ]);

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    resolve: { user: LoginResolver }
  },
  { path: 'about', component: AboutComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'signing-auth-redirect', component: SigningAuthRedirectComponent},
  { path: 'invalid-link' , component: InvalidLinkComponent },
  {
    path: 'msg-sent',
    component: MsgSentComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized }
  },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'rejecc', component: RejeccComponent },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized }
  },
  {
    path: 'signing',
    component: SigningComponent,
    canActivate: [ SigningGuard ],
    resolve: { user: LoginResolver }
  },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  {
    path: 'viewing',
    component: ViewingComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized },
    resolve: { user: LoginResolver }
  },
  {
    path: 'your-virtrolio',
    component: YourVirtrolioComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized },
    resolve: { user: LoginResolver }
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})], // scroll to top when routerLinking
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
