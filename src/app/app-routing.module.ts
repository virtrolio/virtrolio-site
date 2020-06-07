import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewingComponent } from './viewing/viewing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MsgSentComponent } from './msg-sent/msg-sent.component';
import { VirtrolioCoverComponent } from './virtrolio-cover/virtrolio-cover.component';
import { HomeComponent } from './home/home.component';
import { SigningComponent } from './signing/signing.component';
import { FriendLinkComponent } from './friend-link/friend-link.component';
import { SettingsComponent } from "./settings/settings.component";
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'friend-link', component: FriendLinkComponent },
  { path: 'msg-sent', component: MsgSentComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'settings', component: SettingsComponent},
  { path: 'signing', component: SigningComponent },
  { path: 'viewing', component: ViewingComponent },
  { path: 'virtrolio-cover', component: VirtrolioCoverComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
