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

// ngx-markdown
import { MarkdownModule } from 'ngx-markdown';

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// Pages
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
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
import { VirtrolioCoverComponent } from './pages/virtrolio-cover/virtrolio-cover.component';


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
    VirtrolioCoverComponent
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
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
