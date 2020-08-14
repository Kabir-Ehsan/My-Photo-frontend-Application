import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo.service';
import { photo } from '../photo';
import { AlbumService } from '../album.service';
import { album } from '../album';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private photoService: PhotoService, private albumService: AlbumService) { }

  albumId: string;
  albums: album[];
  photos: photo[];
  
  ngOnInit(): void {
    
    
    this.route.paramMap.subscribe(nothing=>{
      this.albumId = nothing.get('albumId');
      console.log('Got Album Id:', this.albumId);
    });

    

    /*this.photoService.getAllPhoto().subscribe(
      response => {
        this.photos = <photo[]>response;
        console.log("Got all photos", response)
    });*/

    this.albumService.getPhotos(this.albumId).subscribe(
      photos =>{
        this.photos = <photo[]>photos;
        console.log("Got all photos from this album", this.photos)
      }
    );

    this.albumService.getAllAlbums().subscribe(
      response => {
        this.albums = <album[]>response;
        console.log("Got all albums", this.albums);
      }
    );
  }

}
