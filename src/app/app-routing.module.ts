import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewingComponent } from './viewing/viewing.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: 'login', component: LoginComponent },
  { path: 'viewing', component: ViewingComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/pagenotfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
