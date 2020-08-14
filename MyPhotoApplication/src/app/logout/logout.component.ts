import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  
  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  logOut(){
    console.log("User Logged Out");
    this.userService.logout();
  }

}
