import { Component } from '@angular/core';
import { SearchInputComponent } from "../search-input/search-input.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchInputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
