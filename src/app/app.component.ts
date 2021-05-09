import { Component } from '@angular/core';
import { AuthService } from './providers/auth.service'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public memberPages = [
    { title: 'News', url: '/folder/News', icon: 'newspaper' },
    { title: 'Chat', url: '/folder/Chat', icon: 'chatbubbles' }
  ];
  public boardPages = [
    { title: 'Mitglieder', url: '/folder/Members', icon: 'people' },
    { title: 'Aufgaben', url: '/folder/Task', icon: 'checkbox' }

  ]
  darkTheme = false; 
  isBoardMember = false;


  constructor(private auth : AuthService) {

  }

  
}
