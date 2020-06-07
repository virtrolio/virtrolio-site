import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewingComponent } from './viewing/viewing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { SigningComponent } from './signing/signing.component';
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'viewing', component: ViewingComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'signing', component: SigningComponent },
  { path: 'settings', component: SettingsComponent},
  { path: '**', pathMatch: 'full', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
