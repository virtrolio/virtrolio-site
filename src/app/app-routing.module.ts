import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SigningComponent } from './signing/signing.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'signing', component: SigningComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
