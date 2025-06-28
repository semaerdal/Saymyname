import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true, 
  imports: [RouterLink], 
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

// Leer, muss sein, damit es angezeigt wird
export class FooterComponent {

}
