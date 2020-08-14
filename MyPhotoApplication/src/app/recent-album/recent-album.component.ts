import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { album } from '../album';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-recent-album',
  templateUrl: './recent-album.component.html',
  styleUrls: ['./recent-album.component.css']
})
export class RecentAlbumComponent implements OnInit {

  albums: album[];

  

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    
    console.log("Calling Album Service from component")
    this.albumService.getAllAlbums().subscribe(
      response => {
        this.albums = <album[]>response;
        console.log("Got all albums", this.albums);
        
      }
    )
  }

}