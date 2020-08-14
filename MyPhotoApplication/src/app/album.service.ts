import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { album } from './album';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient, private router: Router){ }

  saveAlbum(albumTitle: string, fileId: string){

    var album: album = {
      coverPhotoUrl: environment.ApiBaseUrl + "files/show/" + fileId,
      createdBy: "",
      creationDate: "",
      id:	"",
      title: albumTitle
    };

    var headers = this.getHeader();
    this.http.post(environment.ApiBaseUrl + "albums", album, {headers}).subscribe(
      albumData =>{
        console.log("Album Created: ", albumData);
        var album: album = <album>(albumData);
        var albumId = album.id;
        this.router.navigate(['album/', albumId]);
      }
    );
  }


  getAllAlbums(){
    var headers = this.getHeader();
    console.log("Calling get all albums method with header", headers);
    return this.http.get(environment.ApiBaseUrl + "albums/all", {headers});
  }

  getPhotos(albumId: string)
  {
    var headers = this.getHeader();
    return this.http.get(environment.ApiBaseUrl + "albums/"+ albumId +"/photos", {headers});

  }

  getAlbumsForUser(){
    var headers = this.getHeader();
    //var params = new HttpParams().set("id", albumId);
    console.log("Calling get User's albums method with header", headers);
    return this.http.get(environment.ApiBaseUrl + "albums/", {headers});
  }

  getHeader()
  {
    var headers ={
      'idToken': localStorage.getItem('userIdToken')
    };
    return headers;
  }
}
