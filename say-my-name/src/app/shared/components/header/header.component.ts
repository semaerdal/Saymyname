import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Add this import

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [RouterLink], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartItemCount = 0;
}