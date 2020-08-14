import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { photo } from '../photo';
import { ActivatedRoute } from '@angular/router';
import { comment } from '../comment';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  imageUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  constructor(private photoService: PhotoService, private route: ActivatedRoute) { }

  photo: photo;
  photoId: string;
  allComments: comment[];

  newComments: string;


  ngOnInit(): void {
    /*this.photoService.getAllPhoto().subscribe(
      response => {
        this.photos = <photo[]>response;
        console.log("Got all photos", response)
      }
    )*/

    this.route.paramMap.subscribe(nothing=>{
      this.photoId = nothing.get('photoId');
      console.log('Got photo Id:', this.photoId);
      this.loadPhoto(this.photoId);
      this.loadComments(this.photoId);
      }
    );

  }
  
  loadPhoto(photoId: string)
  {
    this.photoService.getPhoto(photoId).subscribe(
      photo =>{
        this.photo = <photo>photo;
        console.log('Loaded Photo details:', this.photo);
      }
    );

  }

  loadComments(photoId: string)
  {
    this.photoService.getComments(photoId).subscribe(
      comments =>{
        this.allComments = (<comment[]>comments).reverse();
        console.log('Loaded Comments details:', this.allComments);
      }
    );

  }

  makeProfilePhoto(){
    this.photoService.makeProfilePhoto(this.photo.photoUrl).subscribe(
      response => {
        console.log("Profile Photo Updated", response);
      }
    );
  }

  makeCoverPhoto(){
    this.photoService.makeAlbumCoverPhoto(this.photo.photoUrl, this.photo.albumId).subscribe(
      response => {
        console.log("Cover Photo Updated", response);
      }
    );
  }

  saveComment(){
    this.photoService.saveComment(this.photoId, this.newComments).subscribe(
      response=>{
        console.log("Comment Posted");
        this.loadComments(this.photoId);
        this.newComments= "";
      }
    )
  }
  changeOrder(){
    this.allComments = this.allComments.reverse();
  }
}
