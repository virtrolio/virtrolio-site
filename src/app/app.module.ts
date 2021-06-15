// Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
// External Libraries
import { CookieService } from 'ngx-cookie-service';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { ToastrModule } from 'ngx-toastr';
// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
// Pages
import { AboutComponent } from './pages/about/about.component';
import { AccessDeniedBetaComponent } from './pages/access-denied-beta/access-denied-beta.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DisclaimerAnchorComponent } from './pages/signing/disclaimer-anchor/disclaimer-anchor.component';
import { DisclaimerButtonComponent } from './pages/signing/disclaimer-button/disclaimer-button.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { ImageFooterComponent } from './pages/viewing/messages/image-footer/image-footer.component';
import { ImageModalComponent } from './pages/signing/image-modal/image-modal.component';
import { InvalidLinkComponent } from './pages/invalid-link/invalid-link.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { MessageModalComponent } from './pages/viewing/message-modal/message-modal.component';
import { MessagesComponent } from './pages/viewing/messages/messages.component';
import { MsgSentComponent } from './pages/msg-sent/msg-sent.component';
import { MyVirtrolioComponent } from './pages/my-virtrolio/my-virtrolio.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { RejeccComponent } from './pages/rejecc/rejecc.component';
import { ResponsesListComponent } from './pages/viewing/responses-list/responses-list.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SigningAuthRedirectComponent } from './pages/signing-auth-redirect/signing-auth-redirect.component';
import { SigningComponent } from './pages/signing/signing.component';
import { SingleMessageComponent } from './pages/viewing/single-message/single-message.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';
import { ViewingComponent } from './pages/viewing/viewing.component';
// Services
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoginResolver } from './core/login-resolver';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PendingChangesGuard } from './core/pending-changes.guard';
import { ErrorAlertComponent } from './pages/signing/error-alert/error-alert.component';

@NgModule({
  declarations: [
    AccessDeniedBetaComponent,
    AccessDeniedComponent,
    AppComponent,
    AboutComponent,
    ContactComponent,
    DisclaimerAnchorComponent,
    DisclaimerButtonComponent,
    ErrorAlertComponent,
    FaqComponent,
    HomeComponent,
    MessagesComponent,
    MsgSentComponent,
    MyVirtrolioComponent,
    ImageFooterComponent,
    ImageModalComponent,
    InvalidLinkComponent,
    MessageModalComponent,
    MaintenanceComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    RejeccComponent,
    ResponsesListComponent,
    SettingsComponent,
    SigningAuthRedirectComponent,
    SigningComponent,
    SingleMessageComponent,
    TermsOfServiceComponent,
    ViewingComponent,
  ],
  imports: [
    AlertModule.forRoot(),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    BrowserModule,
    CommonModule,
    CoreModule,
    FormsModule,
    MarkdownModule.forRoot({
      // set various markdown options
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          // makes having 2 newlines for a line break unnecessary
          breaks: true,
        },
      },
    }),
    ModalModule.forRoot(),
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [CookieService, LoginResolver, PendingChangesGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
