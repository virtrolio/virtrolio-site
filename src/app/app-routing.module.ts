import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VirtrolioCoverComponent } from './virtrolio-cover/virtrolio-cover.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: 'login', component: LoginComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: 'virtrolio-cover', component: VirtrolioCoverComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/pagenotfound'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
