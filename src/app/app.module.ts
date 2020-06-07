// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from "../environments/environment";
import { AngularFireAnalyticsModule } from "@angular/fire/analytics";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

// ngx-markdown
import { MarkdownModule } from "ngx-markdown";

// App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { FooterComponent } from './footer/footer.component';
import { FriendLinkComponent } from './friend-link/friend-link.component';
import { HomeComponent} from './home/home.component';
import { MsgSentComponent } from './msg-sent/msg-sent.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { SigningComponent } from "./signing/signing.component";
import { ViewingComponent } from './viewing/viewing.component';
import { MessagesComponent } from './viewing/messages/messages.component';
import { ResponsesListComponent } from './viewing/responses-list/responses-list.component';
import { VirtrolioCoverComponent } from './virtrolio-cover/virtrolio-cover.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    FriendLinkComponent,
    HomeComponent,
    MsgSentComponent,
    NavbarComponent,
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
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
