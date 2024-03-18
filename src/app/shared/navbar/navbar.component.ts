import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isDropdownVisible = false;

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
    console.log(this.isDropdownVisible);
  }
}
