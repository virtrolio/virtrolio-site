import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FaqComponent } from './pages/faq/faq.component';
import { FriendLinkComponent } from './pages/friend-link/friend-link.component';
import { HomeComponent } from './pages/home/home.component';
import { MsgSentComponent } from './pages/msg-sent/msg-sent.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SettingsComponent } from "./pages/settings/settings.component";
import { SigningComponent } from './pages/signing/signing.component';
import { ViewingComponent } from './pages/viewing/viewing.component';
import { VirtrolioCoverComponent } from './pages/virtrolio-cover/virtrolio-cover.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'friend-link', component: FriendLinkComponent },
  { path: 'msg-sent', component: MsgSentComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'signing', component: SigningComponent },
  { path: 'viewing', component: ViewingComponent },
  { path: 'virtrolio-cover', component: VirtrolioCoverComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
