import { Component } from '@angular/core';
import { UserService } from './user.service';
import { MessageService } from './message.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyPhotoApplication';
  constructor(public userService: UserService, public messageService: MessageService) { }

  logOut(){
    console.log("User Logged Out");
    this.userService.logout();
  }

  clearMessages(){
    this.messageService.clearMessages();
  }


}
