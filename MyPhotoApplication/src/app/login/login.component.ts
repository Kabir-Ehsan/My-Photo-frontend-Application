import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 constructor(private userService: UserService) { }

  name: string;
  pass = "";

  signInVisible = true;

  email: string;
  password: string;

  ngOnInit(): void {

  }

  makeSignInVisible(){
    this.signInVisible = true;
  }

  makeSignUpVisible(){
    this.signInVisible = false;
  }

  signIn(){
    console.log("User tried to Sign In");
    this.userService.login(this.email, this.password);
    this.email="";
    this.password="";
    return true;
    //this.userService.logout();
  }

  signUp(){
    console.log("User tried to Sign Up");
    this.userService.signup(this.email, this.password, this.name);
    this.email="";
    this.password="";
  }

  /*logOut(){
    console.log("User Logged Out");
    this.userService.logout();
  }*/
  

}
