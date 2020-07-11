import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NgModule } from '@angular/core';
import { PendingChangesGuard } from './core/pending-changes.guard';
import { RouterModule, Routes } from '@angular/router';
// Pages
import { AboutComponent } from './pages/about/about.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { InvalidLinkComponent } from './pages/invalid-link/invalid-link.component';
import { MsgSentComponent } from './pages/msg-sent/msg-sent.component';
import { MyVirtrolioComponent } from './pages/my-virtrolio/my-virtrolio.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SigningAuthRedirectComponent } from './pages/signing-auth-redirect/signing-auth-redirect.component';
import { SigningComponent } from './pages/signing/signing.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { ViewingComponent } from './pages/viewing/viewing.component';
// Services & Guards
import { LoginResolver } from './core/login-resolver';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { RejeccComponent } from './pages/rejecc/rejecc.component';
import { SigningGuard } from './core/signing.guard';
import { PreventURLAccessGuard } from './core/prevent-urlaccess.guard';

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
  {
    path: 'invalid-link',
    component: InvalidLinkComponent,
    // canActivate: [ PreventURLAccessGuard ]
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    // canActivate: [ PreventURLAccessGuard ]
  },
  {
    path: 'msg-sent',
    component: MsgSentComponent,
    // canActivate: [ PreventURLAccessGuard ],
  },
  {
    path: 'my-virtrolio',
    component: MyVirtrolioComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized },
    resolve: { user: LoginResolver }
  },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  {
    path: 'rejecc',
    component: RejeccComponent,
    // canActivate: [ PreventURLAccessGuard ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized },
    resolve: { user: LoginResolver }
  },
  {
    path: 'signing',
    component: SigningComponent,
    canActivate: [ SigningGuard ],
    resolve: { user: LoginResolver },
    canDeactivate: [ PendingChangesGuard ]
  },
  {
    path: 'signing-auth-redirect',
    component: SigningAuthRedirectComponent,
    // canActivate: [ PreventURLAccessGuard ]
  },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  {
    path: 'viewing',
    component: ViewingComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorized },
    resolve: { user: LoginResolver }
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled', // scroll to top when routerLinking
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload'
    }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
