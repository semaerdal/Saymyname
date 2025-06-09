import { Component } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';

@Component({
  selector: 'app-test-firebase',
  imports: [],
  templateUrl: './test-firebase.component.html',
  styleUrl: './test-firebase.component.css'
})
export class TestFirebaseComponent {
  constructor(private firebaseService: FirebaseService) {}
  
}
