import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: '**', pathMatch: 'full', redirectTo: '/pagenotfound'},
  { path: 'login', component: LoginComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
