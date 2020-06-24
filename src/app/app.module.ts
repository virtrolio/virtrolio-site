// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// External Libraries
import { CookieService } from 'ngx-cookie-service';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// Pages
import { AboutComponent } from './pages/about/about.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { ContactComponent } from './pages/contact/contact.component';
import { InvalidLinkComponent } from './pages/invalid-link/invalid-link.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FriendLinkComponent } from './pages/friend-link/friend-link.component';
import { HomeComponent } from './pages/home/home.component';
import { MsgSentComponent } from './pages/msg-sent/msg-sent.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SigningComponent } from './pages/signing/signing.component';
import { ViewingComponent } from './pages/viewing/viewing.component';
import { MessagesComponent } from './pages/viewing/messages/messages.component';
import { ResponsesListComponent } from './pages/viewing/responses-list/responses-list.component';
import { RejeccComponent } from './pages/rejecc/rejecc.component';
import { YourVirtrolioComponent } from './pages/your-virtrolio/your-virtrolio.component';
import { TermsOfServiceComponent } from './pages/terms-of-service/terms-of-service.component';

// Services
import { LoginResolver } from './core/login-resolver';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent,
    FriendLinkComponent,
    HomeComponent,
    MsgSentComponent,
    PageNotFoundComponent,
    SettingsComponent,
    SigningComponent,
    ViewingComponent,
    MessagesComponent,
    ResponsesListComponent,
    YourVirtrolioComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    InvalidLinkComponent,
    AccessDeniedComponent,
    RejeccComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    MarkdownModule.forRoot({
      // set various markdown options
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          // makes having 2 newlines for a line break unnecessary
          breaks: true,
        },
      },
    })
  ],
  providers: [ CookieService, LoginResolver ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
