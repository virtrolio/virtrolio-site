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
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent} from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VirtrolioCoverComponent } from './virtrolio-cover/virtrolio-cover.component';
import { ViewingComponent } from './viewing/viewing.component';
import { MessagesComponent } from './viewing/messages/messages.component';
import { ResponsesListComponent } from './viewing/responses-list/responses-list.component';
import { SigningComponent } from "./signing/signing.component";
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    ViewingComponent,
    MessagesComponent,
    ResponsesListComponent,
    HomeComponent,
    VirtrolioCoverComponent
    SigningComponent
    SettingsComponent
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
