import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SigningComponent } from './signing/signing.component';
import { FriendLinkComponent } from './friend-link/friend-link.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: 'friend-link', component: FriendLinkComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/pagenotfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
