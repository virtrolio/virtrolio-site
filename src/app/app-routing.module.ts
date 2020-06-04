import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VirtrolioCoverComponent } from './virtrolio-cover/virtrolio-cover.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: 'virtrolio-cover', component: VirtrolioCoverComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/pagenotfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
