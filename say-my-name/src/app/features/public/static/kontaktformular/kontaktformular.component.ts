import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Add this import
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink], // Je nach Bedarf
  templateUrl: './kontaktformular.component.html',
  styleUrls: ['./kontaktformular.component.css']
})
export class KontaktformularComponent {

}
