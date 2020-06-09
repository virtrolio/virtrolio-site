import { NgModule } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";

@NgModule({
    imports: [ ],
    declarations: [
      NavbarComponent,
      FooterComponent
    ],
    exports: [
      NavbarComponent,
      FooterComponent
    ],
    providers: [ ]
})
export class CoreModule { }
