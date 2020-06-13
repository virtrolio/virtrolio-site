import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    RouterModule,
    AppRoutingModule,
    CommonModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: []
})
export class CoreModule {
}
