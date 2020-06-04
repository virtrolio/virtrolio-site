import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MsgSentComponent } from './msg-sent/msg-sent.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: 'msg-sent', component: MsgSentComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/pagenotfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
