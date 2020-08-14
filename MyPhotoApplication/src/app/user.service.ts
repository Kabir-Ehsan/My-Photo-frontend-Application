import { Injectable } from '@angular/core';



import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { user } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';


//import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class UserService implements CanActivate{

  user: Observable<firebase.User>;

  userIdToken: string;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private http: HttpClient,
    private messageService: MessageService) {
    this.user = firebaseAuth.authState;
    //this.userIdToken = localStorage.getItem('userIdToken');
    
    console.log("User Id Token at the construction of the service: ", localStorage.getItem('userIdToken'));

    this.user.subscribe(
      userInfo => {console.log("User Info is Available", userInfo)
      this.saveIdToken(userInfo)//passing promise
      }
  ); //when successful user observable is satisfied, we are subscribing to that
      //returned some user info from firebase print user info and also call a method and pass the
      // user info get id token which is a promise of a string
  }

  canActivate(): boolean{
    if(this.firebaseAuth.auth.currentUser!= null)
    {
      return true;
    }
    else
    {
      this.router.navigate(['login']);
      return false;
    }
  }

  /*storeIdToken(idToken:Promise<string>) // promise.then when is available we are printing that
  {
    idToken.then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        //this.userIdToken = localStorage.getItem('userIdToken');
        //console.log("Id Token Value: ", idTokenValue);
       console.log("Id Token Value: ", localStorage.getItem('userIdToken'))
    }
    );//when value is available what do we do
  }*/

  saveIdToken(firebaseUser: firebase.User) // promise.then when is available we are printing that
  {
    firebaseUser.getIdToken().then(
      idTokenValue => {
        localStorage.setItem('userIdToken', idTokenValue);
        //this.userIdToken = localStorage.getItem('userIdToken');
        //console.log("Id Token Value: ", idTokenValue);
       console.log("Id Token Value: ", localStorage.getItem('userIdToken'))
    }
    );//when value is available what do we do
  }
  

  signup(email: string, password: string, name: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success signup!', value);
        this.messageService.newSuccess('Success signup!');
        this.registerUser(email, name);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.messageService.newMessage(err.message);
      });    
  }

  registerUser(email: string, name: string)
  {
    var user: user = {
      emailAddress: email,
      id:	"",
      name: name,
      profilePhotoUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    };

    this.http.post(environment.ApiBaseUrl + "users/register", user)
      .subscribe(response => {
        console.log('Success Registration');
        this.router.navigate(['albums/recent']);
      });
    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.messageService.newSuccess("Login Successful");
        this.saveIdToken(value.user);
        this.router.navigate(['albums/recent']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.messageService.newMessage(err.message);
      });
  }

  logout() {
    localStorage.clear();
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  getCurrentUserProfile(){
    var headers = this.getHeader();
    console.log("Calling get all albums method with header", headers);
    return this.http.get(environment.ApiBaseUrl + "users/me", {headers});
  }

  getHeader()
  {
    var headers ={
      'idToken': localStorage.getItem('userIdToken')
    };
    return headers;
  }
  
}
