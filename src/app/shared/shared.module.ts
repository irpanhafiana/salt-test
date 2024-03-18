import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [NavbarComponent, FooterComponent, LoaderComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, FooterComponent, LoaderComponent],
})
export class SharedModule {}
