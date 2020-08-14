import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'firebase';
import { user } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  title = 'Profile Page Title';

  viewCount = 0;

  name = "Kabir";

  list = ["10", "item 1", "part 2"];

  user: user;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe(
      userProfile=>{
        this.user = <user>userProfile;
        console.log("Got user profile", this.user);
        //console.log("Got user profile", this.user.emailAddress);

      }
    )
  }

  incrementCount(){
    this.viewCount++;

  }

}
