import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { comment } from './comment';
import { photo } from './photo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, private router: Router) { }

  makeProfilePhoto(photoUrl: string){
    var headers = {
      'idToken': localStorage.getItem("userIdToken")
    };
    var params = new HttpParams().set("photoUrl", photoUrl);

    return this.http.put(environment.ApiBaseUrl+"users/me/profilePhoto",params,{headers});

  }

  makeAlbumCoverPhoto(photoUrl: string, albumId: string){
    var headers = {
      'idToken': localStorage.getItem("userIdToken")
    };
    var params = new HttpParams().set("photoUrl", photoUrl).set("id", albumId);

    return this.http.put(environment.ApiBaseUrl+"albums/coverPhoto",params,{headers});

  }

  getAllPhoto()
  {
    var headers = {
      'idToken': localStorage.getItem("userIdToken")
    };
    return this.http.get(environment.ApiBaseUrl + "photos", {headers});

  }

  getPhoto(photoId: string)
  {
    var headers = {
      'idToken': localStorage.getItem("userIdToken")
    };
    return this.http.get(environment.ApiBaseUrl + "photos/"+ photoId, {headers});

  }

  getComments(photoId: string)
  {
    var headers = {
      'idToken': localStorage.getItem("userIdToken")
    };
    return this.http.get(environment.ApiBaseUrl + "photos/"+ photoId + "/comments", {headers});

  }

  saveComment(photoId:string, newComments:string){

    var comment: comment = {
      comment: newComments,
      createdBy: "",
      dateCreated: "",
      id:	"",
      photoId: photoId
    };

    var headers = {
      'idToken': localStorage.getItem("userIdToken")
    };
    
    return this.http.post(environment.ApiBaseUrl + "photos/comments", comment, {headers})
  }

  savePhoto(albumId: string, fileId: string){

    var photo: photo = {

      albumId: albumId,
      createdBy: "",
      dateCreated: "",
      fileId: "",
      id: "",
      photoUrl: environment.ApiBaseUrl + "files/show/" + fileId,
      thumbnailUrl:environment.ApiBaseUrl + "files/show/" + fileId
    };

    var headers = {
      'idToken': localStorage.getItem("userIdToken")
    };
    this.http.post(environment.ApiBaseUrl + "photos", photo, {headers}).subscribe(
      photoData =>{
        console.log("Photo Created: ", photoData);
        var photo: photo = <photo>(photoData);
        var albumId = photo.albumId;
        this.router.navigate(['album/', albumId]);
      }
    );
  }
}
