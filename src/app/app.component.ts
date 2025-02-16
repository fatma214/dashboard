import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from "./pages/users/users.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersComponent, NavbarComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-dashboard';
}
